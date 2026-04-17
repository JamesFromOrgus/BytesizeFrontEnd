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
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';
import TheoryBlock from '../Molecules/TheoryBlock';
import MultiChoice from '../Molecules/MultiChoice';
import FillInTheBlanks from '../Molecules/FillInTheBlanks';
import Flashcards from '../Molecules/Flashcards';
import MatchTermToDefinition from '../Molecules/Match';

// ─── lesson content ────────────────────────────────────────────────────────────
// Each item in this array is one "step" in the lesson.
// The `type` field tells the renderer which component to show.
// Adding new steps is as simple as pushing another object here.

const LESSON_STEPS = [
  {
    type: 'theory',
    title: 'loop control statements',
    theory_text: 'break – stop the loop immidiately\nfor i in range(10):\n    if i == 5:\n        break\n    print(i)'
  },

  {
    type: 'theory',
    title: 'loop control statements',
    theory_text: 'continue – skip current iteration immidiately\nfor i in range(10):\n    if i == 5:\n        continue\n    print(i)'
  },

  {
    type: 'theory',
    title: 'loop control statements',
    theory_text: 'pass – placeholder\nfor i in range(3):\n    pass'
  },

  {
    type: 'theory',
    title: 'looping through collections',
    theory_text: 'lists like these: fruits = ["apple", "banana"] are iterable.\n\nfor f in fruits:\n    print(f)'
  },

  {
    type: 'theory',
    title: 'looping through collections',
    theory_text: 'dictionaries are looped through the keys\n\nfor key in student:\n    print(key)\n\nlooping through values\nfor value in student.values():\n    print(value)\n\nlooping through key-value pairs\nfor key, value in student.items():\n    print(key, value)'
  },

  {
    type: 'theory',
    title: 'nested loops',
    theory_text: 'for x in range(3)\n    for y in range(2):\n        print(x, y)'
  },

  {
    type: 'theory',
    title: 'combining loops with conditions',
    theory_text: 'numbers = [1, 4, 6, 7, 10]\nfor i in numbers:\n    if n % 2 == 0:\n         print(n, "is even")\n    else:\n         print(n, "is odd")'
  },

  {
    type: 'multichoice',
    title: 'given the previous algorithm and a list nums = [3, 10, 7, 2, 9, 12], which numbers are even?',
    options: [
      { text: '3, 10, 2, 12', correct: false },
      { text: '10, 2, 12', correct: true }
    ]
  },

  {
    type: 'theory',
    title: 'extra challenge',
    theory_text: 'write an algorithm calculating the sum of numbers from 1 to 100.'
  },

  {
    type: 'multichoice',
    title: 'which of the following are the loop control statements?',
    options: [
      { text: 'pause, continue, pass', correct: false },
      { text: 'break, pass, continue', correct: true },
      { text: 'pass, loop, pause', correct: false },
      { text: 'class, continue, break', correct: false}
    ]
  },

  {
    type: 'theory',
    title: 'extra exercise: searching',
    theory_text: 'using break loop through a list of colours, stop when you find blue and print the result'
  },

  {
    type: 'theory',
    title: 'advanced challenge',
    theory_text: 'create a loop that keeps asking yser for a password until they enter a correct one\n\nfor example: correct_password = "python_1234"\n and then print "access granted" when the user enters the correct password'
  }
];

// ─── component ─────────────────────────────────────────────────────────────────

export default function Lesson7({ setPage }: PageProps) {
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