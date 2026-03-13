import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

const lessons = [
  {
    id: "1",
    title: "lesson 1\nintroduction",
    description: "in this lesson we will introduce you to python, its basics and application, and how to get started.",
    status: "not started",
  },
  {
    id: "2",
    title: "lesson 2\nvariables",
    description: "learn how variables work in python and how they store and manipulate data.",
    status: "not started",
  },
  {
    id: "3",
    title: "lesson 3\noperators",
    description: "learn about special symbols in python that perform actions on values and variables.",
    status: "not started",
  }
];

export default function CoursePage({ setPage }: PageProps) {
  return (
    <View style={styles.background}>
      <StatusBar style="auto" />

      {/* Back Arrow */}
      <Pressable onPress={() => setPage('home')} style={styles.back_button}>
        <Text style={styles.back_arrow}>{'<'}</Text>
      </Pressable>

      {/* Page Title */}
      <Text style={styles.h1}>python for{'\n'}beginners</Text>

      {/* Horizontal Card Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        style={styles.carousel_container}
      >
        {lessons.map((item) => (
          <View key={item.id} style={styles.lesson_card}>
            <Text style={styles.lesson_title}>{item.title}</Text>
            <Button
              text={item.status}
              color={styleVariables.orange}
              height={24}
              width={96}
              action={void null}
            />
            <View style={styles.statLine} />
            <Text style={styles.lesson_description}>{item.description}</Text>
            <Button
              text="start"
              label_color={styleVariables.black}
              color={styleVariables.white}
              height={36}
              width={219}
              action={void null}
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
    position: 'absolute',
    top: 70,
    left: 24,
  },
  back_arrow: {
    fontSize: 32,
    color: styleVariables.black,
    fontFamily: 'Montserrat_600SemiBold',
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
    flexGrow: 0,
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