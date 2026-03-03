import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

export default function AccountPage({ setPage }: PageProps) { 
  return (
    <View style={styles.container}>
      {/* Profile header section */}
      <Text style={[styles.starIcon, {color: styleVariables.orange}]}>   *</Text>

      <View style={styles.header}>

        <View style={styles.avatarContainer}>
        <Image 
          source={require('../assets/cartoonpfp.jpg')} 
          style={styles.avatar} 
        />
        </View>  

        <Text style={styles.userName}>whupazz</Text>
        
        <View style={styles.levelRow}>
          <Text style={styles.levelText}>level 4</Text>
          <Text style={[styles.levelText, { color: 'grey' }]}>level 5</Text>
        </View>

        <View style={styles.progressBar}>
          <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: styleVariables.green, width: "50%"}]}/>
        </View>

        <View style={styles.xpRow}>
          <Text style={styles.xpText}>3236xp</Text>
          <Text style={styles.xpText}>6550xp</Text>
        </View>
      </View>


      <View style={styles.statsSection}>
        <Text style={styles.sectionHeader}>stats for nerds</Text>
        <View style={styles.statLine} /> 

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>lessons completed: <Text style={styles.statValue}>67</Text></Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>courses completed: <Text style={styles.statValue}>5</Text></Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>first lesson: <Text style={styles.statValue}>4/5/2026</Text></Text>
        </View>
      </View>

      {/* Settings button */}
      <View style={styles.centerButton}>
        <Button 
          text="settings" 
          color={styleVariables.green} 
          width={250} 
          height={45} 
          action={() => setPage('settings')} 
        />
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
          action={() => {}} 
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingTop: 80,
  },
  starIcon: {
    fontFamily: 'Montserrat_600SemiBold',
    position: 'absolute',
    top: 60,
    right: 25,
    fontSize: 80,
    color: 'orange',
    fontWeight: '300',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 36,
    color: 'black',
    fontweight: 600,
    letterSpacing: -1,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 22,
  },
  progressBar: {
    height: 28,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 14, // the rounded shape
    overflow: 'hidden',
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  xpText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
  },
  statsSection: {
    marginTop: 30,
  },
  sectionHeader: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 24,
    color: 'black',
  },
  statLine: {
    height: 3,
    backgroundColor: 'black',
    marginTop: 5,
    marginBottom: 20,
  },
  statRow: {
    marginBottom: 12,
  },
  statLabel: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
    color: 'black',
  },
  statValue: {
    color: styleVariables.orange,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: styleVariables.white,
    borderTopWidth: 2,
    borderColor: styleVariables.black,
  },
});