import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

export default function AccountPage({ setPage }: PageProps) { 
  return (
    <View style={styles.container}>
      {/* Profile header section */}
      <View style={styles.header}>
        <Text style={styles.userName}>whupazz</Text>
        
        <View style={styles.levelRow}>
          <Text style={styles.levelText}>level 6</Text>
          <Text style={[styles.levelText, { color: '#ccc' }]}>level 5</Text>
        </View>

        <View style={styles.progressBar}></View>


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
          action={() => {}} 
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
    backgroundColor: styleVariables.white,
    paddingHorizontal: 25,
    paddingTop: 80,
  },
  header: {
    marginBottom: 30,
  },
  userName: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 42,
    color: styleVariables.black,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  levelText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 18,
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  xpText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
  },
  statsSection: {
    marginTop: 20,
  },
  sectionHeader: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 28,
    color: styleVariables.black,
  },
  statLine: {
    height: 3,
    backgroundColor: styleVariables.black,
    marginTop: 5,
    marginBottom: 20,
  },
  statRow: {
    marginBottom: 10,
  },
  statLabel: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 20,
    color: styleVariables.black,
  },
  statValue: {
    color: styleVariables.orange,
  },
  centerButton: {
    alignItems: 'center',
    marginTop: 50,
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
  progressBar: {
   height: 20,
   width: '100%',
   backgroundColor: 'white',
   borderColor: '#0D0C0C',
   borderWidth: 2,
   borderRadius: 5
 }
});