import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

export default function StartPage({ setPage }: PageProps) {
  return (
    <View style={styles.background}>
      <View style={{width: 256}}>
        <Text style={styles.logo_text}>welcome   <Text style={[styles.logo_text, {color: styleVariables.orange}]}>*</Text></Text>
        <Text style={styles.logo_text}>bytesize.</Text>
      </View>
      <View style={{gap: 20, marginTop: 36}}>
        <Button text={'login'} color={styleVariables.green} action={function (): void {
          setPage('login');
        }}/>
        <Button text={'register'} label_color={styleVariables.black} color={styleVariables.white} action={function (): void {
          setPage('register');
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
    fontSize: 36,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.black,
  }
});
