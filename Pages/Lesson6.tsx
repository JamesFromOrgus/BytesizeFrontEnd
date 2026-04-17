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

// ─── lesson content ────────────────────────────────────────────────────────────
// Each item in this array is one "step" in the lesson.
// The `type` field tells the renderer which component to show.
// Adding new steps is as simple as pushing another object here.

const LESSON_STEPS = [
  {
    type: 'theory',
    title: 'what are the loops?',
    theory_text: 'loops allow your program to repeat actions without writing the same code multiple times. python has two main types:\nfor loops (sequential)\nwhile loops (conditional)'
  },

  {
    type: 'theory',
    title: 'for loops',
    theory_text: 'for loops are good at looping for specific number of times.\nbasic example: for x in [1, 2, 3]:\n  print(x)'
  },

  {
    type: 'theory',
    title: 'looping over a string',
    theory_text: 'for char in "hello":\n  print(char)'
  },

  {
    type: 'theory',
    title: 'for loop examples',
    theory_text: 'looping using range()\nfor i in range(5)\n  print(i)\n\nrange variants also exist in the loops in the following pattern: range(start, stop, step). for example:\nfor i in range(10, 0, -2)\n  print(i)'
  },

  {
    type: 'theory',
    title: 'while loop',
    theory_text: 'while loops iterate until a condition is met\ncount = 0 while(count < 5):\n  print(count)\n  count+= 1'
  },

  {
    type: 'multichoice',
    title: 'find an infinite loop',
    options: [
      { text: 'n = 3\nwhile n = 3:\n   print("n")', correct: true },
      { text: 'while False\n   print("true")', correct: false },
      { text: 'c = 4\nwhile c = 3:\n   print("c)', correct: false}
    ]
  },

  {
    type: 'multichoice',
    title: 'an if statement can be used within a loop statement',
    options: [
      { text: 'A: True', correct: false },
      { text: 'B: False', correct: true}
    ]
  },
  
  {
    type: 'theory',
    title: 'extra challenge!',
    theory_text: 'counting down\nuse range() statement to print: 10, 9, 8 and so on until you reach 1'
  }
];

// ─── component ─────────────────────────────────────────────────────────────────

export default function Lesson6({ setPage }: PageProps) {
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