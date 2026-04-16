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
    title: 'What are Conditionals?',
    theory_text:
      'Conditionals let your code make decisions based on Boolean logic (True or False).\n\nThe "if" statement evaluates a condition. If the condition is True, the indented block of code underneath it runs. If it is False, the code is skipped entirely.',
  },
  {
    type: 'theory',
    title: 'Elif and Else',
    theory_text:
      '• elif (else if): Checks another condition, but ONLY if the preceding "if" was False.\n• else: Acts as a catch-all at the very end. It strictly catches anything else if all above conditions were False. It does NOT take a condition itself!',
  },
  {
    type: 'theory',
    title: 'Indentation is Key',
    theory_text:
      'In Python, code inside an if-statement MUST be indented (pushed to the right using spaces or tab). This visual block is how Python knows which lines of code belong to that specific condition.',
  },
  {
    type: 'theory',
    title: 'If/If vs. If/Elif',
    theory_text:
      'If you use two "if" statements in a row, Python evaluates BOTH of them. If both are true, both blocks of code run.\n\nIf you use "if" followed by "elif", Python stops checking as soon as it finds the FIRST true statement and ignores the rest.',
  },
  {
    type: 'multichoice',
    title: 'Are conditional statements based on boolean logic?',
    options: [
      { text: 'Yes', correct: true },
      { text: 'No', correct: false },
    ],
  },
  {
    type: 'multichoice',
    title: 'Which keywords are used for conditionals in Python?',
    options: [
      { text: 'when, then, otherwise', correct: false },
      { text: 'if, elif, else', correct: true },
      { text: 'check, next, default', correct: false },
    ],
  },
  {
    type: 'multichoice',
    title: 'How many comparison operators (like >, <, ==) can you use in a conditional?',
    options: [
      { text: 'None', correct: false },
      { text: 'Some', correct: false },
      { text: 'Most', correct: false },
      { text: 'All', correct: true },
    ],
  },
  {
    type: 'multichoice',
    title: 'Which of the values evaluates as True',
    options: [
      { text: '[]', correct: false},
      { text: '"" (Empty string)', correct: false},
      { text: 'None', correct: false },
      { text: '10', correct: true },
    ],
  },
  {
    type: 'theory',
    title: 'IDE Challenge: Grade Evaluator',
    theory_text:
      'Time to practice in your ide! Write a program using if/elif/else statements that takes a score (0–100) and prints the correct grade:\n\n• 90–100 → "A"\n• 80–89 → "B"\n• 70–79 → "C"\n• 60–69 → "D"\n• Below 60 → "F"\n\nBonus: If the score is outside the 0–100 range, print "Invalid score"!',
  },
  {
    type: 'multichoice',
    title: 'If age = 15, what will the conditional "13 <= age <= 19" evaluate to?',
    options: [
      { text: 'True (Teenager)', correct: true },
      { text: 'False (Not a teenager)', correct: false },
    ],
  },
];

// ─── component ─────────────────────────────────────────────────────────────────

export default function Lesson5({ setPage }: PageProps) {
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