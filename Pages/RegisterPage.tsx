import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Pressable, Alert, Image, useWindowDimensions } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import InputBox from '../Atoms/InputBox';
import { PageProps } from '../App';
import { useState } from 'react';

export default function RegisterPage({ setPage }: PageProps) {
    const [errorMsg, setError] = useState('')
    const { height,width } = useWindowDimensions(); // Needed for fine control on adataptive sizing for elements 
    
    return (
    <View style={styles.background}>
      {/* Asset Import 
      bytesize. pattern */}

      <Image source={require('../assets/pattern-black.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: width,
          height: 107,
          zIndex: 10,
        }}
        resizeMode="cover"
        />

      {/* Bottom Background Graph */}
      <Image 
        source={require('../assets/graph-cat.png')}
        style={{
          position: 'absolute',
          bottom: 0,

          // 1. Use a percentage so it's always 80% of the screen width
          width: width * 0.9, 
          aspectRatio: 1, 
          zIndex: 1, 
        }}
      // 4. 'cover' forces the image to fill the width * 0.8 box entirely
       resizeMode="contain" 
      />

      <View style={{width: 300}}>
        <Text style={[styles.logo_text, {color: styleVariables.orange}]}>def <Text style={[styles.logo_text]}>create_user():</Text></Text>
      </View>
      <View style={{gap: 20, marginTop: 24}}>
        <InputBox placeholder_text='email' autocomplete_hint='email'/>
        <InputBox placeholder_text='username'/>
        <InputBox placeholder_text='password' obfuscated={true} autocomplete_hint='new-password'/>
        <Button text={'register'} color={styleVariables.green} width={300} action={function (): void { setPage('onboarding')
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