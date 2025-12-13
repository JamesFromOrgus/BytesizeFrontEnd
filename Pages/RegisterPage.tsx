import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import InputBox from '../Atoms/InputBox';

export default function RegisterPage() {
  return (
    <View style={styles.background}>
      <View style={{width: 300}}>
        <Text style={[styles.logo_text, {color: styleVariables.orange}]}>def <Text style={[styles.logo_text]}>create_user():</Text></Text>
      </View>
      <View style={{gap: 20, marginTop: 24}}>
        <InputBox placeholder_text='email' autocomplete_hint='email'/>
        <InputBox placeholder_text='username'/>
        <InputBox placeholder_text='password' obfuscated={true} autocomplete_hint='new-password'/>
        <Button text={'register'} color={'#5D866C'} action={function (): void {
          Alert.alert("Call register endpoint here.")
        }}/>
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
    justifyContent: 'center',
  },
  logo_text: {
    fontSize: 32,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.black,
  }
});