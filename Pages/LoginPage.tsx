import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, useWindowDimensions } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import InputBox from '../Atoms/InputBox';
import { PageProps } from '../App';
import { useState } from 'react';

export default function LoginPage( {setPage}: PageProps) {
  const [errorMsg, setError] = useState('');
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
          width: width * 0.9, 
          aspectRatio: 1, 
          zIndex: 1, 
        }}
       resizeMode="contain" 
      />

      <View style={{width: 300}}>
        <Text style={[styles.logo_text, {color: styleVariables.orange}]}>return<Text style={[styles.logo_text]}>ing user?</Text></Text>
      </View>
      <View style={{gap: 20, marginTop: 24}}>
        <InputBox placeholder_text='username/email'/>
        <InputBox placeholder_text='password' autocomplete_hint='current-password' obfuscated={true}/>
        <Button text={'login'} color={styleVariables.green} width={300} action={function (): void {
          setPage('onboarding')
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