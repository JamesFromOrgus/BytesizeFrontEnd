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
    title: 'what are conditionals?',
    theory_text:
      'conditionals let your code make decisions based on boolean logic (True or False).\n\nthe "if" statement evaluates a condition. if the condition is true, the indented block of code underneath it runs. if it is false, the code is skipped entirely.',
  },
  {
    type: 'theory',
    title: 'elif and else statements',
    theory_text:
      '• elif (else if): checks another condition, but ONLY if the preceding "if" was false.\n• else: acts as a catch-all at the very end. it strictly catches anything else if all above conditions were false. it does NOT take a condition itself!',
  },
  {
    type: 'theory',
    title: 'indentation is key',
    theory_text:
      'in python, code inside an if-statement MUST be indented (pushed to the right using spaces or tab). this visual block is how python knows which lines of code belong to that specific condition.',
  },
  {
    type: 'theory',
    title: 'If/If vs. If/Elif',
    theory_text:
      'if you use two "if" statements in a row, python evaluates BOTH of them. if both are true, both blocks of code run.\n\nif you use "if" followed by "elif", python stops checking as soon as it finds the FIRST true statement and ignores the rest.',
  },
  {
    type: 'multichoice',
    title: 'are conditional statements based on boolean logic?',
    options: [
      { text: 'Yes', correct: true },
      { text: 'No', correct: false },
    ],
  },
  {
    type: 'multichoice',
    title: 'which keywords are used for conditionals in Python?',
    options: [
      { text: 'when, then, otherwise', correct: false },
      { text: 'if, elif, else', correct: true },
      { text: 'check, next, default', correct: false },
    ],
  },
  {
    type: 'multichoice',
    title: 'how many comparison operators (like >, <, ==) can you use in a conditional?',
    options: [
      { text: 'None', correct: false },
      { text: 'Some', correct: false },
      { text: 'Most', correct: false },
      { text: 'All', correct: true },
    ],
  },
  {
    type: 'multichoice',
    title: 'which of the values evaluates as True',
    options: [
      { text: '[]', correct: false},
      { text: '"" (Empty string)', correct: false},
      { text: 'None', correct: false },
      { text: '10', correct: true },
    ],
  },
  {
    type: 'theory',
    title: 'ide challenge: drade evaluator',
    theory_text:
      'time to practice in your ide! write a program using if/elif/else statements that takes a score (0–100) and prints the correct grade:\n\n• 90–100 → "A"\n• 80–89 → "B"\n• 70–79 → "C"\n• 60–69 → "D"\n• Below 60 → "F"\n\nbonus: if the score is outside the 0–100 range, print "invalid score"!',
  },
  {
    type: 'multichoice',
    title: 'if age = 15, what will the conditional "13 <= age <= 19" evaluate to?',
    options: [
      { text: 'True (teenager)', correct: true },
      { text: 'False (not a teenager)', correct: false },
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