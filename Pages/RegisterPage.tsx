import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Pressable, Alert, Image } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import InputBox from '../Atoms/InputBox';
import { PageProps } from '../App';
import { useState } from 'react';

export default function RegisterPage({ setPage }: PageProps) {
    const [errorMsg, setError] = useState('')
    return (
    <View style={styles.background}>
      <Image source={require('../assets/pattern-black.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 107,
          zIndex: 10,
        }}
        resizeMode="contain"
        />
        
      <View style={{width: 300}}>
        <Text style={[styles.logo_text, {color: styleVariables.orange}]}>def <Text style={[styles.logo_text]}>create_user():</Text></Text>
      </View>
      <View style={{gap: 20, marginTop: 24}}>
        <InputBox placeholder_text='email' autocomplete_hint='email'/>
        <InputBox placeholder_text='username'/>
        <InputBox placeholder_text='password' obfuscated={true} autocomplete_hint='new-password'/>
        <Button text={'register'} width={300} color={styleVariables.green} action={function (): void {
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
    fontSize: 32,
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