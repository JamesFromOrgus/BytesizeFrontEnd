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
    title: 'what is python?',
    theory_text:
      'python is a high-level language created by Guido van Rossum in 1991. applied in back end development, software development and scientific computing.',
  },
  {
    type: 'theory',
    title: 'why python?',
    theory_text:
      'python has a simple syntax, it is multiplatform, beginner friendly, interpretive and procedural with oop (object orientated programming) support.',
  },
  {
    type: 'theory',
    title: 'interpreter v. compiler',
    theory_text:
      'interpreter runs code line by line, while the compiler assembles the entire application and runs the code afterwards. interpreter allows prototyping and file assembly, though mistakes become harder to spot.',
  },
  {
    type: 'theory',
    title: 'language levels',
    theory_text:
      '1. low level: machine code that is read directly by the computer (binary).\n2. assembly: programming language that builds on top of the machine code by the application of mnemonics.\n3. high level: languages like python, c#, java, javascript, etc. they require further conversion.',
  },
  {
    type: 'theory',
    title: 'ide',
    theory_text:
      'integrated development environment is a piece of software that allows developers to create and write code. it is similar to a text editor, but for code.',
  },
  {
    type: 'theory',
    title: 'quick challenge!',
    theory_text:
      'try creating your first project on a computer with a filename main.py and write a line: print("Hello World").',
  },
  {
    type: 'multichoice',
    title: 'when was python created?',
    options: [
      { text: '1985', correct: false },
      { text: '1991', correct: true },
      { text: '2001', correct: false },
      { text: '2008', correct: false },
    ],
  },
  {
    type: 'multichoice',
    title: 'which assembly method does python use?',
    options: [
      { text: 'compiler', correct: false },
      { text: 'assembler', correct: false },
      { text: 'interpreter', correct: true },
      { text: 'transpiler', correct: false },
    ],
  },
  {
    type: 'match',
    title: 'match terms to their definitions',
    pairs: [
      { term: 'machine code', definition: 'consists of binary' },
      { term: 'low level', definition: 'a language made of simple mnemonics' },
      { term: 'high level', definition: 'closest to spoken english' },
    ],
  },
  {
    type: 'multichoice',
    title: 'which symbols are used to create comments in python?',
    options: [
      { text: '//', correct: false },
      { text: '#', correct: true },
      { text: '/* */', correct: false },
      { text: '--', correct: false },
    ],
  },
  {
    type: 'fillinblanks',
    title: 'fill in the blanks',
    prefix: 'print',
    answer: '("Hello World!")',
  },
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

      case 'match':
        return (
          <MatchTermToDefinition
            key={index}
            title={step.title!}
            pairs={step.pairs!}
            callback={(correct) => { if (correct) advance(); }}
          />
        );

      case 'fillinblanks':
        return (
          <FillInTheBlanks
            key={index}
            title={step.title!}
            prefix={step.prefix!}
            answer={step.answer!}
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
