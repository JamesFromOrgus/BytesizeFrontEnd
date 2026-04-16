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
  {
    type: 'theory',
    title: 'Logical Operators',
    theory_text:
      'Logical operators combine multiple conditions to give a final True or False verdict (True or False).\n\nand - Both must be True (e.g., (5 > 3) and (2 > 1))\nor - At least one must be true (e.g., (5 > 3) or (2 > 1))\nnot - Reverses True/False (e.g., Not True = False)',
  },
  {
    type: 'theory',
    title: 'Membership & Identity Operations',
    theory_text:
      'Identity checks if two variables refer to the same object:\nis - Same object (A is b)\nis not - Not same object (A is not b)\n\nMembership checks if a value is in a sequence:\nin - Is item inside (A in cat)\nnot in - Is item not inside (3 not in 1,2,4)',
  },
  {
    type: 'theory',
    title: 'Operator Precedence',
    theory_text:
      'Python follows mathematical order:\n1. Parentheses ()\n2. Exponents **\n3. Multiplication/Division * / // %\n4. Addition/Subtraction + -\n5. Comparisons == != > < >= <=\n6. Logical operators and, or, not',
  },
  {
    type: 'multichoice',
    title: 'Calculate the following: 17 // 3',
    options: [
      { text: '5.66', correct: false },
      { text: '5', correct: true },
      { text: '2', correct: false },
      { text: '6', correct: false },
    ],
  },
  {
    type: 'multichoice',
    title: 'Calculate the following: (10+3) * 2',
    options: [
      { text: '16', correct: false },
      { text: '20', correct: false },
      { text: '26', correct: true },
      { text: '132', correct: false },
    ],
  },
  {
    type: 'multichoice',
    title: 'State if true or false',
    options: [
      { text: '10 == 7', correct: false },
      { text: '5 <= 4', correct: false },
      { text: '9 != 9', correct: false },
      { text: '3 <= 3', correct: true },
    ],
  },
  {
    type: 'match',
    title: 'Match the operator to its precedence order (1 is first)',
    pairs: [
      { term: '-', definition: '4' },
      { term: '()', definition: '1' },
      { term: '//', definition: '3' },
      { term: '**', definition: '2' },
    ],
  },
  {
    type: 'multichoice',
    title: 'Start with x = 10. What is x after: x += 5 ?',
    options: [
      { text: '5', correct: false },
      { text: '15', correct: true },
      { text: '105', correct: false },
      { text: '50', correct: false },
    ],
  },
  {
    type: 'multichoice',
    title: "fruits = ['apple', 'banana', 'orange']\nIs 'grape' not in fruits?",
    options: [
      { text: 'True', correct: true },
      { text: 'False', correct: false },
    ],
  },
  {
    type: 'theory',
    title: 'Bonus: Expressions',
    theory_text:
      'An expression is a combination of values, variables, and operators that Python evaluates. Try some in your ide\n\nExamples:\n5 + 3 * 2\nx > 10 and y < 5\n"Hello " + "World"',
  },
];

// ─── component ─────────────────────────────────────────────────────────────────

export default function Lesson4({ setPage }: PageProps) {
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