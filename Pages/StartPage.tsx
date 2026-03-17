import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Pressable, Alert, Image, useWindowDimensions } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

export default function StartPage({ setPage }: PageProps) {

  const { height,width } = useWindowDimensions(); // Needed for fine control on adataptive sizing for elements 

  return (
    <View style={styles.background}>
      {/* Graphic import that is able to scale with the screen size of the device */}
      <Image source={require('../assets/graph.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: width * 0.75,
          height: height * 0.75,
          transform: [
            { translateX: -(width * 0.7) * 0.4 },
            { translateY: -(height * 0.7 / 1.5) * 0.7 },
          ],
          zIndex: -10,
        }}
        resizeMode="contain"
      />

      {/* Bottom Left Elipse - Has a simple movement to the bottom right corner without the abilty to scale */}
      <Image source={require('../assets/elipse.png')}
              style={{
                position: 'absolute',
                top: 718,
                right: 0,
                height: 154,
                zIndex: -10,
              }}
              resizeMode="contain"
              />

      <View style={{width: 256}}>
        <Text style={styles.logo_text}>welcome   <Text style={[styles.logo_text, {color: styleVariables.orange}]}>   *</Text></Text>
        <Text style={styles.logo_text}>bytesize.</Text>
              
        {/* Background star is placed in relation to the text so that it always correctly highlights the te in bytesize */}
        <Image source={require('../assets/star.png')}
        style={{
          position: 'absolute',
          height: 52,
          top: 57,
          left: 33,
          zIndex: -10,
          }}
        resizeMode="contain"
        />

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
    zIndex: -10
  },
  logo_text: {
    fontSize: 36,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.black,
  }
});
