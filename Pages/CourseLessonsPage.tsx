import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

// Each lesson maps its id to the page name that should be navigated to.
// When you create Lesson2, Lesson3, etc., add them to the pages map in App.tsx
// and update the pageKey here.
const lessons = [
  {
    id: '1',
    title: 'lesson 1\nintroduction',
    description:
      'in this lesson we will introduce you to python, its basics and application, and how to get started.',
    status: 'not started',
    pageKey: 'lesson1',
  },
  {
    id: '2',
    title: 'lesson 2\nvariables',
    description:
      'learn how variables work in python and how they store and manipulate data.',
    status: 'not started',
    pageKey: 'lesson2',
  },
  {
    id: '3',
    title: 'lesson 3\nsimple\noperators',
    description:
      'learn about special symbols in python that perform actions on values and variables.',
    status: 'not started',
    pageKey: 'lesson3',
  },
  {
    id: '4',
    title: 'lesson 4\nadvanced\noperators',
    description:
      'learn about advanced special symbols in python that perform actions on values and variables.',
    status: 'not started',
    pageKey: 'lesson4',
  },
  {
    id: '5',
    title: 'lesson 5\nconditionals',
    description:
      'learn about conditional statements in python to make program decisions.',
    status: 'not started',
    pageKey: 'lesson5',
  },
  {
    id: '6',
    title: 'lesson 6\nsimple\nloops',
    description:
      'in this lesson you will learn how to use loops with python, and demistify for and while keywords.',
    status: 'not started',
    pageKey: 'lesson6',
  },
  {
    id: '7',
    title: 'lesson 7\nadvanced\nloops',
    description:
      'in this lesson you will learn how to use advanced loops with python, and demistify for and while keywords.',
    status: 'not started',
    pageKey: 'lesson7',
  },
  {
    id: '8',
    title: 'lesson 8\ninput',
    description:
      'this lesson will teach you how to take input from users and apply it in your programs.',
    status: 'not started',
    pageKey: 'lesson8',
  },
  {
    id: '9',
    title: 'lesson 9\nfunctions\npart 1',
    description: 'learn how to use functions in python.',
    status: 'not started',
    pageKey: 'lesson9',
  },
  {
    id: '10',
    title: 'lesson 10\nadvanced\nfunctions',
    description: 'learn how to use functions in python extensively.',
    status: 'not started',
    pageKey: 'lesson10',
  },
  {
    id: '11',
    title: 'lesson 11\nlists',
    description: 'learn how to use lists and data structures in python.',
    status: 'not started',
    pageKey: 'lesson11',
  },
] as const;

// The pageKey values used above must all be registered in App.tsx's `pages` map.
// Type cast via `as const` lets TypeScript infer the narrow union.
type LessonPageKey = typeof lessons[number]['pageKey'];

export default function CoursePage({ setPage }: PageProps) {
  return (
    <View style={styles.background}>
      <StatusBar style="auto" />

      {/* Back button */}
      <Pressable onPress={() => setPage('home')} style={styles.back_button}>
        <Image
          source={require('../assets/back-arrow.png')}
          style={styles.back_arrow_image}
          resizeMode="contain"
        />
      </Pressable>

      {/* Top-right decorative element */}
      <Image
        source={require('../assets/elipse-black.png')}
        pointerEvents="none"
        style={styles.elipse}
        resizeMode="contain"
      />

      {/* Page title */}
      <Text style={styles.h1}>python for{'\n'}beginners</Text>

      {/* Horizontal card carousel — each card navigates to its own lesson page */}
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        style={styles.carousel_container}
      >
        {lessons.map((item) => (
          <View key={item.id} style={styles.lesson_card}>
            <Text style={styles.lesson_title}>{item.title}</Text>

            {/* Status badge */}
            <Button
              text={item.status}
              color={styleVariables.orange}
              height={24}
              width={96}
              action={() => {}}
            />

            <View style={styles.statLine} />

            <Text style={styles.lesson_description}>{item.description}</Text>

            {/* "start" navigates to the lesson-specific page */}
            <Button
              text="start"
              label_color={styleVariables.black}
              color={styleVariables.white}
              height={36}
              width={219}
              action={() => setPage(item.pageKey as any)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: styleVariables.white,
    paddingTop: 80,
  },
  back_button: {
    marginBottom: 20,
    left: 20,
    alignSelf: 'flex-start',
  },
  back_arrow_image: {
    width: 32,
    height: 32,
  },
  elipse: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 154,
    zIndex: 0,
  },
  h1: {
    fontSize: 36,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.orange,
    marginTop: 40,
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  carousel_container: {
    flex: 1,
  },
  carousel: {
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: 'flex-start',
  },
  lesson_card: {
    width: 251,
    backgroundColor: styleVariables.blue,
    borderRadius: 15,
    paddingTop: 24,
    paddingBottom: 44,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: styleVariables.black,
    marginRight: 16,
  },
  lesson_title: {
    fontSize: 24,
    color: styleVariables.white,
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: 12,
  },
  statLine: {
    height: 3,
    backgroundColor: styleVariables.white,
    marginVertical: 12,
    borderRadius: 2,
  },
  lesson_description: {
    fontSize: 12,
    color: styleVariables.white,
    fontFamily: 'Montserrat_600SemiBold',
    lineHeight: 18,
    marginBottom: 20,
  },
});
