import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated, Image, Pressable, Modal, useWindowDimensions } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

import { get_user_information, UserInfo, change_password, get_level_information, LevelInfo, StatInfo, get_statistics, change_icon } from '../BackendConnectivity';

export default function AccountPage({ setPage }: PageProps) { 
  const { width, height } = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  //const [selectedPfp, setSelectedPfp] = useState(require('../assets/cartoonpfp.jpg')); // variable to track the picture currently being held as selected
  const pfps = [
    require('../assets/cartoonpfp.jpg'),
    require('../assets/cartoonpfp-2.jpg'),
    require('../assets/cartoonpfp-3.jpg'),
    require('../assets/cartoonpfp-4.jpg'),
  ];
  const [iconDraft, setIconDraft] = useState(pfps[0]);
  const [iconDraftID, setIconDraftID] = useState(0);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [levelInfo, setLevelInfo] = useState<LevelInfo | null>(null)
  const [statInfo, setStatInfo] = useState<StatInfo | null>(null)

  async function load() {
      const [user, level, stats] = await Promise.all([
        get_user_information(),
        get_level_information(),
        get_statistics()
      ]);

      setUserInfo(user);
      setLevelInfo(level);
      setStatInfo(stats);
    }
  
  useEffect(() => {load();}, []);

  async function setSelectedPfp(index: number) {
    change_icon(index);
    load();
  }

  return (
    <View style={styles.container}>
      {/* Profile header section */}
      <Text style={[styles.starIcon, {color: styleVariables.orange}]}>   *</Text>

      <View style={styles.header}>

        <Pressable onPress={() => setIsModalVisible(true)}>
          <View style={styles.avatarContainer}>
            <Image 
              source={userInfo ? { uri: userInfo.ProfilePicture } : pfps[0]} // Main page picture
              style={styles.avatar} 
            />
          </View>
        </Pressable>  

        <Text style={styles.userName}>{userInfo ? userInfo.Username : ""}</Text>
        
        <View style={styles.levelRow}>
          <Text style={styles.levelText}> {"level " + ((levelInfo?.level ?? 0)).toString()} </Text>
          <Text style={[styles.levelText, { color: 'grey' }]}> {"level " + ((levelInfo?.level ?? 0) + 1).toString()} </Text>
        </View>

        <View style={styles.progressBar}>
          <Animated.View style={[StyleSheet.absoluteFill, {
            backgroundColor: styleVariables.green,
            width: `${levelInfo == null ? 0 : ((levelInfo.experience - levelInfo.lastRequiredExperience) / (levelInfo.nextRequiredExperience - levelInfo.lastRequiredExperience)) * 100}%`}]}
          />
        </View>

        <View style={styles.xpRow}>
          <Text style={styles.xpText}> {((levelInfo?.lastRequiredExperience ?? 0)).toString()+"xp"} </Text>
          <Text style={styles.xpText}> {((levelInfo?.nextRequiredExperience ?? 0)).toString()+"xp"} </Text>
        </View>
      </View>


      <View style={styles.statsSection}>
        <Text style={styles.sectionHeader}>stats for nerds</Text>
        <View style={styles.statLine} /> 

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>lessons completed: <Text style={styles.statValue}>{statInfo?.LessonCount ?? 0}</Text></Text>
        </View>
        {/* <View style={styles.statRow}>
          <Text style={styles.statLabel}>courses completed: <Text style={styles.statValue}>5</Text></Text>
        </View> */}
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>join date: <Text style={styles.statValue}>
            {statInfo ?
            (statInfo.JoinDate.getDate()+1).toString() + "/" +
            (statInfo.JoinDate.getMonth()+1).toString() + "/" +
            statInfo.JoinDate.getFullYear().toString()
            : "1/1/1970"}
            </Text></Text>
        </View>
      </View>

      {/* Settings button */}
      <View style={styles.centerButton}>
        <Button 
          text="settings" 
          color={styleVariables.green} 
          width={250} 
          height={45} 
          action={() => setPage('settings')} 
        />
      </View>

      {/* bottom navigation*/}
      <View style={styles.navBar}>
        <Button 
          image_source={require('../assets/home-icon.png')}
          color={'transparent'} 
          width={60} 
          height={60} 
          action={() => setPage('home')} 
        />
        <Button 
          image_source={require('../assets/accounts-selected-icon.png')}
          color={'transparent'} 
          width={60} 
          height={60} 
          action={() => setPage('account')} 
        />
      </View>

      {/*Profile Picture modal popup */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modal_overlay}>
          <View style={[styles.modal_content, { width: width * 0.9, height: height * 0.75 }]} //variable size
          >

            {/*back arrow */}
            <View style={styles.modal_top_section}>
              <Pressable onPress={() => setIsModalVisible(false)} style={styles.modal_back_button}>
                <Image 
                  source={require('../assets/back-arrow.png')} 
                  style={styles.back_arrow_image} 
                  resizeMode="contain" 
                />
              </Pressable>
              
              {/*Selected avatar */}
              <View style={styles.modal_big_avatar_container}>
                <Image source={iconDraft} style={styles.avatar} />
              </View>
            </View>


            <View style={styles.modal_horizontal_line} // breaker line
            />


            <View style={styles.modal_bottom_section}>
              {/*Row of other profile pictures */}
              <View style={styles.pfp_options_row}>
                {pfps.map((img, index) => (
                  <Pressable 
                    key={index} 
                    onPress={() => {
                      setIconDraft(pfps[index]);
                      setIconDraftID(index);
                    }} // Updates the big picture in the modal
                    style={styles.modal_small_avatar_container}
                  >

                    <Image source={img} style={styles.avatar} />
                  </Pressable>
                ))}
              </View>

              {/*Save Button */}
              <Pressable style={styles.modal_save_button} onPress={() => {
                setSelectedPfp(iconDraftID);
                setIsModalVisible(false);
              }}>
                <Text style={styles.modal_save_text}>save changes</Text>
              </Pressable>

            </View>

          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingTop: 80,
  },
  starIcon: {
    fontFamily: 'Montserrat_600SemiBold',
    position: 'absolute',
    top: 60,
    right: 25,
    fontSize: 80,
    color: 'orange',
    fontWeight: '300',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 36,
    color: 'black',
    fontWeight: '600',
    letterSpacing: -1,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 22,
  },
  progressBar: {
    height: 28,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 14, // the rounded shape
    overflow: 'hidden',
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  xpText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
  },
  statsSection: {
    marginTop: 30,
  },
  sectionHeader: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 24,
    color: 'black',
  },
  statLine: {
    height: 3,
    backgroundColor: 'black',
    marginTop: 5,
    marginBottom: 20,
  },
  statRow: {
    marginBottom: 12,
  },
  statLabel: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
    color: 'black',
  },
  statValue: {
    color: styleVariables.orange,
  },
  centerButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: styleVariables.white,
    borderTopWidth: 2,
    borderColor: styleVariables.black,
  },
  modal_overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // darkening of background for popup
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_content: {
    backgroundColor: styleVariables.white,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: styleVariables.black,
    overflow: 'hidden', //Ensures the line touches the edge
    display: 'flex',
    flexDirection: 'column',
  },
  modal_top_section: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: styleVariables.white,
  },
  modal_back_button: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  back_arrow_image: {
    width: 32,
    height: 32,
  },
  modal_big_avatar_container: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: styleVariables.black,
    overflow: 'hidden',
  },
  modal_horizontal_line: {
    height: 4,
    backgroundColor: styleVariables.black,
    width: '100%',
  },
  modal_bottom_section: {
    flex: 0.8,
    backgroundColor: styleVariables.white, // Slight off-white to match the bottom section of the mockup
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pfp_options_row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 10,
  },
  modal_small_avatar_container: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: styleVariables.black,
    overflow: 'hidden',
  },
  modal_save_button: {
    backgroundColor: styleVariables.green,
    borderWidth: 3,
    borderColor: styleVariables.black,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    width: '90%',
    alignItems: 'center',
  },
  modal_save_text: {
    color: styleVariables.white,
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 18,
  }
});