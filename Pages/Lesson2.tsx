import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { useRef, useState } from 'react';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';
import TheoryBlock from '../Molecules/TheoryBlock';
import MultiChoice from '../Molecules/MultiChoice';
import FillInTheBlanks from '../Molecules/FillInTheBlanks';

const LESSON_STEPS = [
  {
    type: 'theory',
    title: 'what is a variable?',
    theory_text:
      'a variable is a named container that holds a value. in python you create one simply by assigning it: name = "Alice".',
  },
  {
    type: 'theory',
    title: 'variable naming rules',
    theory_text:
      'variable names must start with a letter or underscore, can contain letters, digits and underscores, are case-sensitive, and cannot be python keywords.',
  },
  {
    type: 'theory',
    title: 'data types',
    theory_text:
      'python infers the type automatically:\n• str is text in quotes\n• int are whole numbers\n• float are decimal numbers\n• bool are True or False',
  },
  {
    type: 'multichoice',
    title: 'which is a valid python variable name?',
    options: [
      { text: '2cool', correct: false },
      { text: 'my_name', correct: true },
      { text: 'my-name', correct: false },
      { text: 'class', correct: false },
    ],
  },
  {
    type: 'fillinblanks',
    title: 'assign the string "hello" to a variable called greeting',
    prefix: 'greeting = ',
    answer: '"hello"',
  },
];

export default function Lesson2({ setPage }: PageProps) {
  const [visibleCount, setVisibleCount] = useState(1);
  const progressAnim = useRef(new Animated.Value(1 / LESSON_STEPS.length)).current;
  const scrollRef = useRef<ScrollView>(null);

  const advance = () => {
    const next = visibleCount + 1;
    if (next > LESSON_STEPS.length) { setPage('success'); return; }
    setVisibleCount(next);
    Animated.timing(progressAnim, { toValue: next / LESSON_STEPS.length, duration: 400, useNativeDriver: false }).start();
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 120);
  };

  const renderStep = (step: typeof LESSON_STEPS[number], index: number) => {
    if (index >= visibleCount) return null;
    switch (step.type) {
      case 'theory': return <TheoryBlock key={index} title={step.title!} theory_text={step.theory_text!} callback={advance} />;
      case 'multichoice': return <MultiChoice key={index} title={step.title!} options={step.options!} callback={(c) => { if (c) advance(); }} />;
      case 'fillinblanks': return <FillInTheBlanks key={index} title={step.title!} prefix={step.prefix!} answer={step.answer!} callback={(c) => { if (c) advance(); }} />;
      default: return null;
    }
  };

  return (
    <View style={styles.background}>
      <StatusBar style="auto" />
      <View style={styles.progressBarWrap}>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: styleVariables.green, width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
        </View>
      </View>
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
  background: { flex: 1, backgroundColor: styleVariables.white, paddingTop: 56 },
  progressBarWrap: { paddingHorizontal: 20, marginBottom: 12 },
  progressBarBackground: { height: 20, backgroundColor: styleVariables.white, borderColor: styleVariables.black, borderWidth: 2, borderRadius: 10, overflow: 'hidden' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100, alignItems: 'center' },
});