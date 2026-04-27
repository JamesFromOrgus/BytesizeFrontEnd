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
import FillInTheBlanks from '../Molecules/FillInTheBlanks';
import MatchTermToDefinition from '../Molecules/Match';

// ─── lesson content ────────────────────────────────────────────────────────────
// Each item in this array is one "step" in the lesson.
// The `type` field tells the renderer which component to show.
// Adding new steps is as simple as pushing another object here.

const LESSON_STEPS = [
  {
    type: 'theory',
    title: 'what is a function?',
    theory_text: 'a function is a reusable block of code that performs a specific task. you may think of it like a machine. you provide optional input, it performs action and may return the result.\n\nfunctions help making programs cleaner, shorter and easier to understand.'
  },

  {
    type: 'theory',
    title: 'defining a function',
    theory_text: 'use the def keyword\n\nbasic function\ndef greet()\n   print("Hello!")\n\nto run the function, simply use greet()'
  },

  {
    type: 'theory',
    title: 'functions with parameters',
    theory_text: 'parameters allow your function to accept input.\n\ndef greet(name)\n    print("Hello", name)\n\nnow try calling it: greet("Rhys").\nbare in mind that a function can accept multiple parameters!'
  },

  {
    type: 'theory',
    title: 'return',
    theory_text: 'functions can send back a value using a return statement\ndef multiply(x, y)\n    return x * y\n\nhence why, using the result we can try now this:\nresult = multiply(3, 5)\nprint(result)'
  },

  {
    type: 'theory',
    title: 'default parameter values',
    theory_text: 'you can assign default values to parameters:\ndef welcome(name="Guest")\n    print("Welcome", name)\n\nwe can call the function by using either welcome() or welcome("Alice").'
  },

  {
    type: 'theory',
    title: 'keyword arguments',
    theory_text: 'you can specify arguments by name:\n\ndef profile(name, age)\n    print(name, age)\n\nprofile(age = 20, name = "Adam")'
  },

  {
    type: 'multichoice',
    title: 'what part of the syntax is out of place here?\ndef greet user (name, age):\n...',
    options: [
      { text: 'missing plus sign', correct: false },
      { text: 'wrong variable name', correct: false },
      { text: 'wrong function name', correct: true}
    ]
  },

  {
    type: 'theory',
    title: 'basic function challenge',
    theory_text: 'create a function called say_hello that prints "Hello World!". call it twice.'
  },

  {
    type: 'multichoice',
    title: 'return v. print\nprint and returns are exactly the same',
    options: [
      { text: 'true', correct: false },
      { text: 'false', correct: true}
    ]
  }
];

// ─── component ─────────────────────────────────────────────────────────────────

export default function Lesson1({ setPage }: PageProps) {
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
