import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';
import { useProgress } from '../ProgressContext';
import { start_lesson } from '../BackendConnectivity';

export default function CoursePage({ setPage }: PageProps) {

  // Load the state from ProgressContext.tsx
  const { courseLessons, setCourseLessons, setActiveLessonId } = useProgress();


  // Updates the status of each lesson to "in progress" when the start button is pressed
  const handleStartLesson = (id: string, pageKey: any) => {
    // Tells the global context which lesson we are taking
    setActiveLessonId(id);
    const int_id = parseInt(id);
    start_lesson(int_id);
    
    // updating the status of this lesson to "in progress"
    // (but only if it hasn't been completed yet)
    setCourseLessons((prevLessons) =>
      prevLessons.map((lesson) => {
        if (lesson.id === id && lesson.status === 'not started') {
          return { ...lesson, status: 'in progress' };
        }

        return lesson;
      })
    );
    
    // setting the current page to the lesson pressed
    setPage(pageKey);
  };

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
        {courseLessons.map((item: any) => {
          // setting of colours and status for the lessons
          let badgeColor = styleVariables.orange;
          let badgeLabelColor = styleVariables.white;

          if (item.status === 'in progress') {
            badgeColor = styleVariables.white;
            badgeLabelColor = styleVariables.black;
          } else if (item.status === 'complete') {
            badgeColor = styleVariables.green;
            badgeLabelColor = styleVariables.white;
          }

          return (
            <View key={item.id} style={styles.lesson_card}>
              <Text style={styles.lesson_title}>{item.title}</Text>

              {/* Status badge (Now read-only) */}
              <Button
                text={item.status}
                color={badgeColor} // dependent on current status of lesson
                label_color={badgeLabelColor} // dependent on current status of lesson
                height={24}
                width={96}
                action={() => {}}
              />

            <View style={styles.statLine} />

            <Text style={styles.lesson_description}>{item.description}</Text>

              {/* "start" navigates to the lesson-specific page and sets the active ID */}
              <Button
                text="start"
                label_color={styleVariables.black}
                color={styleVariables.white}
                height={36}
                width={219}
                action={() => handleStartLesson(item.id, item.pageKey as any)} // sets id of lesson
              />
            </View>
          );
        })}
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
