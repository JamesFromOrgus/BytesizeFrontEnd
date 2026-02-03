import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

// Course examples
const COURSES = [
  { id: '1', title: 'python development', lessons: 20, color: styleVariables.orange },
  { id: '2', title: 'computer architectures', lessons: 12, color: styleVariables.orange },
  { id: '3', title: 'further mathematics', lessons: 4, color: styleVariables.blue },
  { id: '4', title: 'statistical analysis', lessons: 67, color: styleVariables.blue },
  { id: '5', title: 'taste the rainbow', lessons: 3, color: styleVariables.blue },
  { id: '6', title: 'how to smell fish', lessons: 10, color: styleVariables.blue },
];

export default function HomePage({ setPage }: PageProps) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* featured/continuing course */}
        <View style={styles.featuredCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>in progress</Text>
          </View>
          <Text style={styles.featuredTitle}>single variable calculus for beginners</Text>
          <View style={styles.centerButton}>
            <Button 
                text="continue" 
                color={styleVariables.white} 
                label_color={styleVariables.black} 
                width={280}
                height={40}
                action={() => {}} 
            />
          </View>
        </View>

        <Text style={styles.sectionHeader}>courses</Text>

        {/* course list */}
        {COURSES.map((course) => (
          <View key={course.id} style={[styles.courseItem, { backgroundColor: course.color }]}>
            <View style={styles.iconBox} />
            <View>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseSub}>{course.lessons} lessons</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* bottom navigation*/}
      <View style={styles.navBar}>
        <Button 
          image_source={require('../assets/home-selected-icon.png')}
          color={'transparent'}
          width={60} 
          height={60} 
          action={() => setPage('home')} // I really don't know if this code should really exist if it goes to itself
        />
        <Button 
          image_source={require('../assets/accounts-icon.png')}
          color={'transparent'} 
          width={60} 
          height={60} 
          action={() => setPage('account')} 
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
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 100, // space for the nav bar
  },
  featuredCard: {
    backgroundColor: styleVariables.green,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: styleVariables.black,
    marginBottom: 24,
  },
  badge: {
    backgroundColor: styleVariables.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: styleVariables.black,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 12,
  },
  featuredTitle: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 24,
    color: styleVariables.white,
    marginBottom: 20,
  },
  centerButton: {
    alignItems: 'center',
  },
  sectionHeader: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 28,
    color: styleVariables.black,
    marginBottom: 16,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: styleVariables.black,
    marginBottom: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    backgroundColor: styleVariables.black,
    borderRadius: 4,
    marginRight: 12,
  },
  courseTitle: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
    color: styleVariables.white,
  },
  courseSub: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 11,
    color: styleVariables.white,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: styleVariables.white,
    borderTopWidth: 2,
    borderColor: styleVariables.black,
  }
});