import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View, Text, Animated } from 'react-native';
import { useRef, useState } from 'react';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';
import TheoryBlock from '../Molecules/TheoryBlock';

const LESSON_STEPS = [
  { type: 'theory', title: 'coming soon', theory_text: 'this lesson is still being written. check back later!' },
];

export default function LessonN({ setPage }: PageProps) {
  const [visibleCount, setVisibleCount] = useState(1);
  const progressAnim = useRef(new Animated.Value(1 / LESSON_STEPS.length)).current;
  const scrollRef = useRef<ScrollView>(null);

  const advance = () => {
    const next = visibleCount + 1;
    if (next > LESSON_STEPS.length) { setPage('success'); return; }
    setVisibleCount(next);
    Animated.timing(progressAnim, { toValue: next / LESSON_STEPS.length, duration: 400, useNativeDriver: false }).start();
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 120);
  };

  return (
    <View style={styles.background}>
      <StatusBar style="auto" />
      <View style={styles.progressBarWrap}>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: styleVariables.green, width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
        </View>
      </View>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {LESSON_STEPS.slice(0, visibleCount).map((step, i) => (
          <TheoryBlock key={i} title={step.title} theory_text={step.theory_text} callback={advance} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: styleVariables.white, paddingTop: 56 },
  progressBarWrap: { paddingHorizontal: 20, marginBottom: 12 },
  progressBarBackground: { height: 20, backgroundColor: styleVariables.white, borderColor: styleVariables.black, borderWidth: 2, borderRadius: 10, overflow: 'hidden' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100, alignItems: 'center' },
});
