import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  useWindowDimensions,
  KeyboardAvoidingView, 
  Platform,             
} from 'react-native';
import { useRef, useState } from 'react';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';
import TheoryBlock from '../Molecules/TheoryBlock';
import MultiChoice from '../Molecules/MultiChoice';
import Match from '../Molecules/Match'; 

const LESSON_STEPS = [

  { type: 'theory', title: 'Lists Basics', theory_text: 'Lists are ordered, changeable collections in Python.\nThey are written using square brackets [].\nExample:\nnumbers = [1, 2, 3, 4]\n\nNote: Python uses index 0 for the first element.' },

  { type: 'theory', title: 'Indexing', theory_text: 'You can access items using their index.\nExample:\nfruits = ["apple", "banana", "orange"]\nprint(fruits[0])  # apple\n\nRemember: indexing starts at 0.' },

  { type: 'theory', title: 'Adding & Removing Items', theory_text: 'Lists can be modified.\nExample:\nfruits.append("pear")\nfruits.pop()\n\n.append() adds an item.\n.pop() removes the last item.' },

  { type: 'theory', title: 'Sorting & Reversing', theory_text: 'Lists can be sorted or reversed.\nExample:\nnumbers = [3, 1, 2]\nnumbers.sort()\nnumbers.reverse()\n\n.sort() changes the list order.\n.reverse() flips the list.' },

  { type: 'multichoice', title: 'Select the features of a list', options: [
    { text: 'changeable', correct: true },
    { text: 'unordered', correct: false },
    { text: 'enclosed within {}', correct: false },
    { text: 'unchangeable', correct: false },
    { text: 'ordered', correct: true },
  ] },

  { type: 'match', title: 'Match the indices', pairs: [
    { left: 'Blueberry', right: '4' },
    { left: 'Orange', right: '2' },
    { left: 'Apple', right: '0' },
  ] },

  { type: 'multichoice', title: 'What does reverse() do?', options: [
    { text: 'Sorts the list', correct: false },
    { text: 'Reverses the order of the list', correct: true },
    { text: 'Deletes the list', correct: false },
  ] },

  { type: 'multichoice', title: 'Which can be used with lists?', options: [
    { text: '.index()', correct: true },
    { text: '.sort()', correct: true },
    { text: '.enumerate()', correct: false },
    { text: '.pop()', correct: true },
  ] },

  { type: 'theory', title: 'Extra Practice', theory_text: 'Given:\ngrades = [70, 85, 90, 70, 100, 70]\n- Find the index of the first 70\n- Count how many times 70 appears\n\nLoop through:\ncolors = ["red", "green", "blue"]\nPrint:\n0 red\n1 green\n2 blue' },

];

// ─── component ─────────────────────────────────────────────────────────────────

export default function Lesson11({ setPage }: PageProps) {
  const { width } = useWindowDimensions();

  // How many steps are currently visible (starts at 1 — only the first block shown)
  const [visibleCount, setVisibleCount] = useState(1);

  // Animated value driving the green fill of the progress bar (0 → 1)
  const progressAnim = useRef(new Animated.Value(1 / LESSON_STEPS.length)).current;

  // Scroll ref so we can auto-scroll down when new content appears
  const scrollRef = useRef<ScrollView>(null);

  // Called by every child component when the user presses its action button.
  // Advances visibleCount and animates the progress bar.
  const advance = () => {
    const next = visibleCount + 1;

    if (next > LESSON_STEPS.length) {
      // All steps completed — go to the success page
      setPage('success');
      return;
    }

    setVisibleCount(next);

    Animated.timing(progressAnim, {
      toValue: next / LESSON_STEPS.length,
      duration: 400,
      useNativeDriver: false, 
    }).start();

    // Small delay lets the new element render before we scroll to it
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 120);
  };

  // Render a single step by its data shape
  const renderStep = (step: typeof LESSON_STEPS[number], index: number) => {
    if (index >= visibleCount) return null; 

    switch (step.type) {
      case 'theory':
        return (
          <TheoryBlock
            key={index}
            title={step.title!}
            theory_text={step.theory_text!}
            callback={advance}
          />
        );

      case 'multichoice':
        return (
          <MultiChoice
            key={index}
            title={step.title!}
            options={step.options!}
            // Only advance on a correct answer; wrong answers are retried in-place
            callback={(correct) => { if (correct) advance(); }}
          />
        );

      case 'match':
        return (
          <Match
            key={index}
            title={step.title!}
            pairs={step.pairs!}
            callback={(correct) => { if (correct) advance(); }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.background}>
      <StatusBar style="auto" />

      {/* ── Progress bar ── */}
      <View style={styles.progressBarWrap}>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: styleVariables.green,
                // Interpolate the 0-1 animated value to a percentage string
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        {/* Step counter label */}
        <Text style={styles.progressLabel}>
          {Math.min(visibleCount, LESSON_STEPS.length)}/{LESSON_STEPS.length}
        </Text>
      </View>

      {/* ── Scrollable lesson content ── */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true} 
          keyboardShouldPersistTaps="handled"      
        >
          {LESSON_STEPS.map((step, i) => renderStep(step, i))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: styleVariables.white,
    paddingTop: 56,
  },
  progressBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 12,
  },
  progressBarBackground: {
    flex: 1,
    height: 20,
    backgroundColor: styleVariables.white,
    borderColor: styleVariables.black,
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressLabel: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 12,
    color: styleVariables.black,
    width: 40,
    textAlign: 'right',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
    alignItems: 'center',
  },
});