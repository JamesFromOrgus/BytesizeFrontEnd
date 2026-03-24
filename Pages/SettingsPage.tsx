import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, useWindowDimensions, Modal, TextInput, Image } from 'react-native';
import styleVariables from '../StyleVariables';
import Button from '../Atoms/Button';
import { PageProps } from '../App';

export default function SettingsPage({ setPage }: PageProps) {
  const { height,width } = useWindowDimensions(); // Needed for fine control on adataptive sizing for elements
  const [darkMode, setDarkMode] = useState(false); // variable for the darkmode switch
  const [isModalVisible, setIsModalVisible] = useState(false); // pop up hidden or not
  return (
    <View style={styles.background}>
      {/*Header (no back arrrow yet) */}
      <View style={[styles.header_row, { width: width * 0.85 }]}> 
        <Text style={styles.page_title}>settings</Text> 
        <Text style={styles.asterisk}>*</Text>
      </View>
      {/*Account details section */}
      <View style={[styles.section_container, { width: width * 0.85 }]}>
        <Text style={styles.section_title}>account</Text>
        
        <View style={styles.divider} />
        
        {/*User Data */}
        <View style={styles.account_info_container}>
          <Text style={styles.info_line}><Text style={styles.label}>name:</Text> <Text style={styles.value}>Nicholas Cage</Text></Text>
          <Text style={styles.info_line}><Text style={styles.label}>email:</Text> <Text style={styles.value}>nicholascage@gmail.com</Text></Text>
          <Text style={styles.info_line}><Text style={styles.label}>dob:</Text> <Text style={styles.value}>11/09/2002</Text></Text>
          <Text style={styles.info_line}><Text style={styles.label}>password:</Text> <Text style={styles.value}>.......</Text></Text>
          <Text style={styles.info_line}><Text style={styles.label}>profile:</Text> <Text style={styles.value}>private</Text></Text>
        </View>

        {/* Edit Button */}
        <Pressable style={styles.edit_button} onPress={() => setIsModalVisible(true)} // on press of edit button opens the editing popup
          >
          <Text style={styles.edit_button_text}>edit</Text>
        </Pressable>
      </View>

      {/*Accessibility section */}
      <View style={[styles.section_container, { width: width * 0.85 }]}>
        <Text style={styles.section_title}>accessibility</Text>
        <View style={styles.divider} />
        
        <View style={styles.access_row}>
          <Text style={styles.label}>dark mode</Text>
          
          {/* Custom Switch uses operators (condition ? true:false) to move the thumb left/right */}
          <Pressable 
            style={[styles.custom_switch, darkMode ? styles.switch_on:styles.switch_off]} 
            onPress={() => setDarkMode(!darkMode)}
          >
            <View style={[styles.switch_thumb, darkMode ? styles.thumb_on:styles.thumb_off]}/>

          </Pressable>
        </View>
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

      {/* Pop-up modal */}
      <Modal
        visible={isModalVisible}
        transparent={true} // allows for a dark overlay for the orginal page
        animationType="fade" // animation goes brrrr (maybe add react-native-modal))
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modal_overlay}>
          
          {/*The actual pop-up box sized to fill most of the screen */}
          <View style={[styles.modal_content, { width: width * 0.9, height: height * 0.8}]}>
            
            <Pressable onPress={() => setIsModalVisible(false)} style={styles.modal_back_button}>
              <Image 
                source={require('../assets/back-arrow.png')} 
                style={styles.back_arrow_image} 
                resizeMode="contain" 
              />
            </Pressable>

            {/* Fields */}
            <View style={styles.modal_section}>
              <Text style={styles.modal_label}>name</Text>
              <View style={styles.modal_line} />
              <TextInput style={styles.modal_input} placeholder="enter new name" placeholderTextColor="styleVariables.grey" />
            </View>

            <View style={styles.modal_section}>
              <Text style={styles.modal_label}>email</Text>
              <View style={styles.modal_line} />
              {/*keyboardType="email-address" gives the @ symbol quickly on the mobile keyboard */}
              <TextInput style={styles.modal_input} placeholder="enter new email" placeholderTextColor="styleVariables.grey" keyboardType="email-address" />
            </View>

            <View style={styles.modal_section}>
              <Text style={styles.modal_label}>date of birth</Text>
              <View style={styles.modal_line} />
              <TextInput style={styles.modal_input} placeholder="enter new dob" placeholderTextColor="styleVariables.grey" />
            </View>

            <View style={styles.modal_section}>
              <Text style={styles.modal_label}>password</Text>
              <View style={styles.modal_line} />
              <TextInput style={styles.modal_input} placeholder="enter new password" placeholderTextColor="styleVariables.grey" secureTextEntry={true} />
            </View>


            <View style={styles.modal_section}>
              <Text style={styles.modal_label}>privacy</Text>
              <View style={styles.modal_line} />
              <Pressable style={styles.orange_modal_button}>
                <Text style={styles.modal_button_text}>turn off private mode</Text>
              </Pressable>
            </View>

            {/*Save Button */}
            <Pressable style={styles.green_modal_button} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modal_button_text}>save changes</Text>

              {/*Figure out what the hell is going on when jump to onboarding or login page (might have something to do with app.tsx scroll being weird) */}
            </Pressable>
          </View>
        </View>
      </Modal>

      
      {/*Log out button */}
      <View style={styles.log_out_button}>
        <Button 
          text="log out" 
          color={styleVariables.orange} 
          width={250} 
          height={45} 
          action={() => setPage('start')} 
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: styleVariables.white,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60, // Pushes content below the phone's status bar/notch
  },
  header_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  page_title: {
    fontSize: 40,
    color: styleVariables.orange,
    fontFamily: 'Montserrat_600SemiBold',
    includeFontPadding: false,
  },
  asterisk: {
    fontSize: 36,
    color: styleVariables.orange,
    fontFamily: 'Montserrat_600SemiBold',
    marginTop: 10,
  },
  section_container: {
    marginBottom: 20,
  },
  section_title: {
    fontSize: 24,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.black,
  },
  divider: {
    height: 3,
    backgroundColor: styleVariables.black,
    marginTop: 4,
    marginBottom: 16,
    width: '100%',
  },
  account_info_container: {
    gap: 10,
    marginBottom: 16,
  },
  info_line: {
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.black,
  },
  value: {
    color: styleVariables.orange, 
  },
  edit_button: {
    backgroundColor: styleVariables.green,
    borderWidth: 2,
    borderColor: styleVariables.black,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: 'flex-start', // Stops it from steaching on the screen
  },
  edit_button_text: {
    color: styleVariables.white,
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
  },
  access_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  custom_switch: {
    width: 44,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: styleVariables.black,
    justifyContent: 'center',
    padding: 2,
  },
  switch_off: {
    backgroundColor: 'transparent',
  },
  switch_on: {
    backgroundColor: 'transparent',
  },
  switch_thumb: {
    width: 18,
    height: 14,
    borderRadius: 7,
    backgroundColor: styleVariables.orange,
  },
  thumb_off: {
    alignSelf: 'flex-start',
  },
  thumb_on: {
    alignSelf: 'flex-end',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly', //Spaces icons evenly across the bar
    alignItems: 'center',
    backgroundColor: styleVariables.white,
    borderTopWidth: 2,
    borderColor: styleVariables.black,
  },
  modal_overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',//dimming effect
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_content: {
    backgroundColor: styleVariables.white,
    padding: 30,
    borderRadius: 20,
    borderWidth: 4, 
    borderColor: styleVariables.black,
    display: 'flex',
    flexDirection: 'column',
  },
  modal_back_button: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  back_arrow_image: {
    width: 32, 
    height: 32,
  },
  modal_section: {
    marginBottom: 14, //Spacing between each input feild
  },
  modal_label: {
    fontSize: 20,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.black,
  },
  modal_line: {
    height: 3,
    backgroundColor: styleVariables.black,
    marginTop: 4,
    marginBottom: 10,
    width: '100%',
  },
  modal_input: {
    borderWidth: 2,
    borderColor: styleVariables.black,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
    backgroundColor: styleVariables.white,
  },
  orange_modal_button: {
    backgroundColor: styleVariables.orange,
    borderWidth: 2,
    borderColor: styleVariables.black,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  green_modal_button: {
    backgroundColor: styleVariables.green,
    borderWidth: 2,
    borderColor: styleVariables.black,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  modal_button_text: {
    color: styleVariables.white,
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
  },
  log_out_button: {
    fontFamily: 'Montserrat_600SemiBold',
    borderColor: styleVariables.black,
    marginTop: 30,
    alignItems: 'center',
  },
});