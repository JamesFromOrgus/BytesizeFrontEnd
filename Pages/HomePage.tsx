import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable, Animated, Image } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

import { get_user_information, UserInfo } from '../BackendConnectivity';
import { useEffect, useState } from 'react';

// Importing global progress state
import { useProgress } from '../ProgressContext';

// Course examples
const COURSES = [
  { id: '1', title: 'python for beginners', lessons: 20, color: styleVariables.orange },
  // { id: '2', title: 'computer architectures', lessons: 12, color: styleVariables.orange },
  // { id: '3', title: 'further mathematics', lessons: 4, color: styleVariables.blue },
  // { id: '4', title: 'statistical analysis', lessons: 67, color: styleVariables.blue },
  // { id: '5', title: 'taste the rainbow', lessons: 3, color: styleVariables.blue },
  // { id: '6', title: 'how to smell fish', lessons: 10, color: styleVariables.blue },
];

export default function HomePage({ setPage }: PageProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  
  // Pulling python for beginner's lessons from the global context
  const { courseLessons } = useProgress();

  useEffect(() => {
    async function logUserInfo() {
      setUserInfo(await get_user_information());
    }

    logUserInfo();
  }, []);


  // This calulates the progress percentage based on completed lessons as set
  const totalLessons = courseLessons.length > 0 ? courseLessons.length : 1;
  const completedLessons = courseLessons.filter(lesson => lesson.status === 'complete').length;
  const progressPercent = `${(completedLessons / totalLessons) * 100}%`;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* featured/continuing course */}
        <View style={styles.featuredCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>in progress</Text>
          </View>
          <Text style={styles.featuredTitle}>python for beginners</Text>

          <View style={styles.progressBar}>
            {/* width is changed by the progressPercent variable*/}
            <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: styleVariables.black, width: progressPercent}]}/>
          </View>

          <View style={styles.centerButton}>
            <Button 
                text="continue" 
                color={styleVariables.white} 
                label_color={styleVariables.black} 
                width={280}
                height={40}
                action={() => setPage('course')} 
            />
          </View>
        </View>

        <Text style={styles.sectionHeader}>courses</Text>

        {/* course list */}
        {COURSES.map((course) => (
          <Pressable 
          key={course.id} 
          onPress={() => setPage('course')}
          style={({ pressed }) => [
            styles.courseItem, 
            { 
              backgroundColor: course.color,
              opacity: pressed ? 0.9 : 1 // Adds a tap effect
            }
          ]}
        >
          <View style={styles.iconBox}>
            <Image 
              source={require('../assets/course-icon.png')}
              style={styles.courseIconImage}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseSub}>{course.lessons} lessons</Text>
          </View>
        </Pressable>
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
    backgroundColor: styleVariables.orange,
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
    color: styleVariables.white,
    fontSize: 12,
  },
  featuredTitle: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 24,
    color: styleVariables.white,
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
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseIconImage: {
    width: 16,
    height: 16,
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
  },
  progressBar: {
    height: 28,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 14, // the rounded shape
    overflow: 'hidden',
    marginVertical: 15,
  },

});