import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Pressable, Alert, Image } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

export default function StartPage({ setPage }: PageProps) {
  return (
    <View style={styles.background}>
      {/* Graphics Import
          Imports the Top Left Graph */}
      <Image source={require('../assets/graph.png')}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 252,
                zIndex: 10,
              }}
              resizeMode="contain"
              />

      {/* Bottom Left Elipse */}
      <Image source={require('../assets/elipse.png')}
              style={{
                position: 'absolute',
                top: 718,
                left: 290,
                right: 0,
                height: 154,
                zIndex: 10,
              }}
              resizeMode="contain"
              />

      {/* Background Star */}
      <Image source={require('../assets/star.png')}
              style={{
                position: 'absolute',
                top: 352,
                left: 106,
                right: 0,
                height: 52,
                zIndex: 0,
              }}
              resizeMode="contain"
              />

      <View style={{width: 256}}>
        <Text style={styles.logo_text}>welcome   <Text style={[styles.logo_text, {color: styleVariables.orange}]}>   *</Text></Text>
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
