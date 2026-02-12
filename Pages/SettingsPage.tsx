import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Switch } from 'react-native';
import Button from '../Atoms/Button';
import InputBox from '../Atoms/InputBox';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

export default function SettingsPage({ setPage }: PageProps) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.background}>
      <View style={styles.header_row}>
        <Pressable onPress={() => setPage('start')} style={styles.back_button}>
          <Text style={styles.back_arrow}>{'<'} </Text>
        </Pressable>
        <Text style={styles.page_title}>settings</Text>
      </View>

      <View style={styles.section_container}>
        <Text style={styles.section_title}>account</Text>
        <View style={styles.divider} />
        <View style={styles.account_row}>
          <View style={styles.account_inputs}>
            <Text style={styles.label}>name:</Text>
            <InputBox placeholder_text={'name'} />

            <Text style={styles.label}>email:</Text>
            <InputBox placeholder_text={'email'} autocomplete_hint={'email'} />

            <Text style={styles.label}>dob:</Text>
            <InputBox placeholder_text={'dob'} />

            <Text style={styles.label}>password:</Text>
            <InputBox placeholder_text={'password'} obfuscated={true} autocomplete_hint={'current-password'} />

            <Text style={styles.label}>profile:</Text>
            <InputBox placeholder_text={'profile'} />
          </View>

          <View style={{justifyContent: 'center'}}>
            <Button text={'save'} color={styleVariables.green} height={30} width={70} action={() => { /* save handler */ }} />
          </View>
        </View>
      </View>

      <View style={styles.section_container}>
        <Text style={styles.section_title}>accessibility</Text>
        <View style={styles.divider} />
        <View style={styles.access_row}>
          <Text style={styles.label}>dark mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} thumbColor={darkMode ? styleVariables.orange : styleVariables.grey} trackColor={{ true: styleVariables.active_blue, false: styleVariables.grey }} />
        </View>
      </View>

      <View style={{marginTop: 28}}>
        <Button text={'log out'} color={styleVariables.orange} width={250} action={() => { /* logout handler */ }} />
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
    paddingTop: 48,
  },
  header_row: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16
  },
  back_button: {
    padding: 8,
  },
  back_arrow: {
    fontSize: 28,
    color: styleVariables.black,
    fontFamily: 'Montserrat_600SemiBold'
  },
  page_title: {
    fontSize: 36,
    color: styleVariables.orange,
    fontFamily: 'Montserrat_600SemiBold'
  },
  section_container: {
    width: 300,
    marginTop: 12,
    paddingBottom: 12
  },
  section_title: {
    fontSize: 22,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.black,
  },
  divider: {
    height: 2,
    backgroundColor: styleVariables.black,
    marginTop: 6,
    marginBottom: 12,
    width: '100%'
  },
  account_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12
  },
  label: {
    fontSize: 14,
    color: styleVariables.black,
    fontFamily: 'Montserrat_600SemiBold',
  },
  value: {
    fontSize: 14,
    color: styleVariables.orange,
    marginBottom: 8,
    fontFamily: 'Montserrat_600SemiBold'
  },
  access_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
