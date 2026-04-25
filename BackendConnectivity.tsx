const url = "http://bytesize-env.eba-c9w42nvu.eu-west-2.elasticbeanstalk.com/api/" //"http://localhost:5175/api/";
var user_token = "";

type LoginResponse = {
    access_token?: string;
};

export type UserInfo = {
    "DateOfBirth": Date,
    "EmailAddress": string,
    "FirstName": string,
    "LastName": string,
    "ProfilePicture": string,
    "Username": string
}

export async function attempt_login(username: string, password: string) {
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

export async function get_user_information() {
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