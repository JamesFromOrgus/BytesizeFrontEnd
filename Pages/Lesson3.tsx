import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View, Text, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { useRef, useState } from 'react';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';
import TheoryBlock from '../Molecules/TheoryBlock';
import MultiChoice from '../Molecules/MultiChoice';
import MatchTermToDefinition from '../Molecules/Match';

const LESSON_STEPS = [
  {
      type: 'theory',
      title: 'What are Operators',
      theory_text: 'Operators are special symbols in Python that perform actions on values and variables.\n You ' +
          'can think of them as tools that allow Python to calculate, compare or modify data.',
  },
    {
        type: 'theory',
        title: 'Basic Operators',
        theory_text:'+ (Addition) 5+3 = 8' +
            '\n - (Subtraction) 10 - 7 = 3' +
            '\n * (multiplication) 4 * 3 = 12' +
            '\n / (division) 8/2 = 4.0' +
            '\n // (Floor division) 9//4 = 2' +
            '\n % (modulus) 10 % 3 = 1' +
            '\n ** (exponent) 2**3 = 8 ',
    },
    {
        type: 'theory',
        title: 'Assignment Operators',
        theory_text: 'Used to assign values to variables' +
            '\n = (Assign) x = 5' +
            '\n += (Add and assign) x += 2' +
            '\n -= (Subtract and assign) x -= 1' +
            '\n *= (Multiply and assign) x *= 3' +
            '\n /= (Divide and assign) x /= 2' +
            '\n **= (Power and assign) x **= 2' +
            '\n DISCLAIMER: Assignment operators only work with specific data types',
    },
    {
        type: 'theory',
        title: 'Comparison Operators',
        theory_text: 'Compares values and outputs a boolean result\n' +
            '== (Equal) 5 == 5 True\n' +
            '!= (Not equal) 5 != 3 True\n' +
            '> (Greater than) 7 > 2 True\n' +
            '< (Less than) 3 < 1 False\n' +
            '>= (Greater or equal) 5 >= 5 True\n' +
            '<= (Less or equal) 4 <= 2 False'
    },
    {
        type: 'match',
        title: 'Match the operator types',
        pairs: [
            {term:'+',definition:"Arithmetic"},
            {term:'>',definition:"Comparison"},
            {term:'/',definition:"Mathematical"}
        ]
    },
    {
        type: 'multichoice',
        title: 'What does % do in python?',
        options: [
            {text: 'Calculates the percentage of a value', correct: false},
            {text: '2 values are divided and the remainder is displayed', correct: true},
            {text: '2 values are divided and the remainder is discarded', correct: false},
            {text: 'all of the above', correct: false},
        ]
    },
    {
        type: 'multichoice',
        title: 'What is the value of 4**3?',
        options: [
            {text: '8', correct: false},
            {text: '12', correct: false},
            {text: '32', correct: false},
            {text: '64', correct: true},
        ]
    },
    {
        type: 'match',
        title: 'Match the comparative operators',
        pairs: [
            {term:'12 > 14', definition:"false"},
            {term:'4 <= 4', definition:"true"}
        ]
    },

];

export default function Lesson3({ setPage }: PageProps) {
  const [visibleCount, setVisibleCount] = useState(1);
  const progressAnim = useRef(new Animated.Value(1 / LESSON_STEPS.length)).current;
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