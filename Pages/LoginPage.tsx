import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import InputBox from '../Atoms/InputBox';
import { PageProps } from '../App';
import { useState } from 'react';

export default function LoginPage( {setPage}: PageProps) {
  const [errorMsg, setError] = useState('');
  return (
    <View style={styles.background}>
      <View style={{width: 300}}>
        <Text style={[styles.logo_text, {color: styleVariables.orange}]}>return<Text style={[styles.logo_text]}>ing user?</Text></Text>
      </View>
      <View style={{gap: 20, marginTop: 24}}>
        <InputBox placeholder_text='username/email'/>
        <InputBox placeholder_text='password' autocomplete_hint='current-password' obfuscated={true}/>
        <Button text={'login'} color={styleVariables.green} action={function (): void {
          setError("Not yet implemented.")
        }}/>
        <Button text={'back'} color={styleVariables.orange} height={30} width={60} action={function (): void {
          setPage('start');
        }}/>
      </View>
      {errorMsg.length > 0 && <Text style={styles.error_text}>Error: {errorMsg}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: styleVariables.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_text: {
    fontSize: 36,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.black,
  },
  error_text: {
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.error,
    marginTop: 24
  }
});