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

// ─── lesson content ────────────────────────────────────────────────────────────
// Each item in this array is one "step" in the lesson.
// The `type` field tells the renderer which component to show.
// Adding new steps is as simple as pushing another object here.

const LESSON_STEPS = [
  {
    type: 'theory',
    title: 'what is input?',
    theory_text: 'in python the input() function allows the user to type something into the program.\n\nname = input("Enter your name: ")\n\nimportant to note that every value made through input() is a string, even if you type number.'
  },

  {
    type: 'theory',
    title: 'example',
    theory_text: 'age = input("Enter your age: ")\nprint(type(age))\n\nthis is type casting.'
  },

  {
    type: 'theory',
    title: 'what is type casting?',
    theory_text: 'type castimg means converting one data type into another. python provides built-in functions for casting:\nint()\nfloat()\nstr()\nbool()'
  },

  {
    type: 'theory',
    title: 'converting input into integers',
    theory_text: 'use int() to convert string into an integer.\n\nage = int(input("Enter your age: "))\nprint(age+1) # now this works\n\nwithout casting, "5" + 1 would break the program'
  },

  {
    type: 'theory',
    title: 'conversion',
    theory_text: 'this kind of conversion applies to every single data type in python. though only bool works sligtly differently – an empty value would be False, while any kind of input would be translated into True.'
  },

  {
    type: 'theory',
    title: 'handling multiple inputs',
    theory_text: 'option a: one-by-one\n\nx = int(input("Enter x: "))\ny = int(input("Enter y: "))\n\noption b: split input into pieces'
  },

  {
    type: 'theory',
    title: 'common input error',
    theory_text: 'users may enter something invalid sometimes into a field. which will cause ValueError, later these can be handled with try/except.'
  },

  {
    type: 'multichoice',
    title: 'which data type does input() collect by default?',
    options: [
      { text: 'boolean', correct: false },
      { text: 'integer', correct: false },
      { text: 'string', correct: true }
    ]
  },

  {
    type: 'multichoice',
    title: 'what is the issue with the following code? donation = int(input" enter your donation aount"))',
    options: [
      { text: 'missing bracket after input', correct: true },
      { text: 'missing coma', correct: false }
    ]
  },

  {
    type: 'multichoice',
    title: 'in booleans an empty string is false',
    options: [
      { text: 'true', correct: true },
      { text: 'false', correct: false }
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