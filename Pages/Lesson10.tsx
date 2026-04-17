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

  { type: 'theory', title: 'Variable number of arguments', theory_text: '*args — allows many unnamed values in a function.\nExample:\ndef total(*numbers): return sum(numbers)\nprint(total(1, 2, 3, 4))\n\n**kwargs — allows many named values.\nExample:\ndef show_info(**info): print(info)\nshow_info(name="Alan", age=22)' },

  { type: 'theory', title: 'Local vs Global Variables', theory_text: 'Local Variable:\nExists only inside a function.\nExample:\ndef func():\n  x = 10  # local\n\nGlobal Variable:\nExists throughout the program.\nExample:\nx = 5  # global\ndef func():\n  print(x)' },

  { type: 'theory', title: 'Why Functions?', theory_text: 'Avoid repeating code.\nMake programs easier to read.\nOrganise logic into reusable pieces.\nEasier debugging and maintenance.' },

  { type: 'multichoice', title: 'Fill in the blank', options: [
    { text: 'local variable', correct: false },
    { text: 'global variable', correct: true },
    { text: 'temporary variable', correct: false },
  ] },

  { type: 'theory', title: 'Write a function', theory_text: 'Write a function:\ndef display_user(**info):\nPrint all key-value pairs inside it.' },

  { type: 'multichoice', title: 'Nested functions', options: [
    { text: 'True', correct: true },
    { text: 'False', correct: false },
  ] },

  { type: 'theory', title: 'Calculator Function', theory_text: 'Create a function calculator(x, y, operation):\n- If operation == "add", return x + y\n- If "subtract", return x - y\n- If "multiply", return x * y\n- If "divide", return x / y\n- Otherwise return "Invalid operation"\n\nTest it with different inputs.' },

];

// ─── component ─────────────────────────────────────────────────────────────────

export default function Lesson10({ setPage }: PageProps) {
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