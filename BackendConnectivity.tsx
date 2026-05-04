const url = "http://bytesize-env.eba-c9w42nvu.eu-west-2.elasticbeanstalk.com/api/"
//const url = "http://localhost:5175/api/";
var user_token = "";
export var pre_lesson_exp = 0;

type LoginResponse = {
    access_token?: string;
};

export type StatInfo = {
    "CourseCount": number,
    "Experience": number,
    "JoinDate": Date,
    "LessonCount": number
}

export type LevelInfo = {
    "lastRequiredExperience": number,
    "nextRequiredExperience": number,
    "experience": number,
    "level": number
}

export type UserInfo = {
    "DateOfBirth": Date,
    "EmailAddress": string,
    "FirstName": string,
    "LastName": string,
    "ProfilePicture": string,
    "Username": string
}

export type UserInfoUpdate = {
    "DateOfBirth"?: Date,
    "EmailAddress"?: string,
    "FirstName"?: string,
    "LastName"?: string,
    "Username"?: string
}

export type PasswordUpdate = {
    "NewPassword" : string
}

export async function complete_question(IsCorrect: boolean) {
    if (user_token == "") return;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user_token,
        "Accept": "application/json"
    };
    const response = await fetch(url + "question", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            IsCorrect
        })
    });
}

export async function start_lesson(LessonNumber: number) {
    if (user_token == "") return;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user_token,
        "Accept": "application/json"
    };
    const response = await fetch(url + "startlesson", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            LessonNumber
        })
    });
    if (response.status == 200) {
        pre_lesson_exp = (await get_level_information())?.experience ?? 0;
    }
}

export async function attempt_login(username: string, password: string) {
    //if (user_token != "") return null;
    logout();
    const response = await fetch(url + "login", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if (!response.ok) {
        console.error("Login request failed:", response.status, response.statusText);
        return null;
    }

    const data = await response.json() as LoginResponse;

    if (data.access_token) {
        user_token = data.access_token;
        return data.access_token;
    }

    return null;
}

export async function attempt_register(Email: string, Username: string, Password: string) {
    //if (user_token != "") return null;
    logout();
    const response = await fetch(url + "register", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            Email,
            Username,
            Password
        })
    });

    if (!response.ok) {
        console.error("Register request failed:", response.status, response.statusText);
        return null;
    }

    const data = await response.json() as LoginResponse;

    if (data.access_token) {
        user_token = data.access_token;
        return data.access_token;
    }

    return null;
}

export async function logout() {
    if (user_token == "") return;
    const headers = {
        "Authorization": "Bearer " + user_token,
        "Accept": "application/json"
    };
    const response = await fetch(url + "logout", {
        method: 'POST',
        headers: headers,
    });
    user_token = "";
    console.log(response.status)
}

export async function get_statistics() {
    if (user_token == "") return null;

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user_token,
        "Accept": "application/json"
    };

    const response = await fetch(url + "profile/stats", {
        method: "GET",
        headers: headers
    });

    if (!response.ok) {
        console.error("Statistics request failed:", response.status, response.statusText);
        return null;
    }

    const data = { ...await response.json() };  // shallow copy
    data.JoinDate = new Date(data.JoinDate);
    console.log(data);
    
    return data as StatInfo;
}

export async function get_user_information() {
    if (user_token == "") return null;

    const headers = {
        "Authorization": "Bearer " + user_token,
        "Accept": "application/json"
    };

    const response = await fetch(url + "profile/info", {
        method: "GET",
        headers: headers
    });

    if (!response.ok) {
        console.error("Profile request failed:", response.status, response.statusText);
        return null;
    }

    const data = { ...await response.json() };  // shallow copy
    data.DateOfBirth = new Date(data.DateOfBirth)
    data.ProfilePicture = await get_icon_base64();
    
    return data as UserInfo;
}

export async function get_level_information() {
    if (user_token == "") return null;

    const headers = {
        "Authorization": "Bearer " + user_token,
        "Accept": "application/json"
    };

    const response = await fetch(url + "profile/experience", {
        method: "GET",
        headers: headers
    });

    if (!response.ok) {
        console.error("Experience request failed:", response.status, response.statusText);
        return null;
    }

    const data = await response.json();

    console.log(data);
    
    return data as LevelInfo;
}

export async function change_password(NewPassword: string) {
    if (user_token == "") return;
    const headers = {
        "Authorization": "Bearer " + user_token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    const response = await fetch(url + "passwordreset", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            NewPassword
        })
    });
    console.log(response.status)
    user_token = "";
}

export async function change_icon(IconID: number) {
    if (user_token == "") return;
    const headers = {
        "Authorization": "Bearer " + user_token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    const response = await fetch(url + "profile/icon", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            IconID
        })
    });
    console.log(response.status)
}

export async function set_user_information(newInfo: UserInfoUpdate) {
    if (user_token == "") return;
    var DateOfBirth = newInfo.DateOfBirth
    ? newInfo.DateOfBirth.toISOString().split("T")[0]
    : undefined;
    var FirstName = newInfo.FirstName
    var LastName = newInfo.LastName
    var EmailAddress = newInfo.EmailAddress
    var Username = newInfo.Username
    const headers = {
        "Authorization": "Bearer " + user_token,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    const response = await fetch(url + "profile/info", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            DateOfBirth,
            FirstName, LastName,
            EmailAddress,
            Username
        })
    });

    console.log(response.status)
}

export async function get_icon_base64() {
  const res = await fetch(url + "profile/icon", {
    headers: {
      Authorization: "Bearer " + user_token
    }
  });

  const blob = await res.blob();

  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}