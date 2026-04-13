import { StyleSheet, Text, View, TextInput } from 'react-native';
import styleVariables from '../StyleVariables';
import Button from '../Atoms/Button';
import { useState } from 'react';

type FillInTheBlanksData = {
  title: string;
  // Text shown to the left of the input field, e.g. 'print'
  prefix: string;
  // The exact string the user must type to be marked correct, e.g. '("Hello World!")'
  answer: string;
  callback: (correct: boolean) => void;
};

export default function FillInTheBlanks({ title, prefix, answer, callback }: FillInTheBlanksData) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    // Trim both sides to avoid whitespace false-negatives
    const correct = value.trim() === answer.trim();
    setIsCorrect(correct);
    setSubmitted(true);
    // Only fire the callback once, on the first submission
    callback(correct);
  };

  const handleRetry = () => {
    setValue('');
    setSubmitted(false);
    setIsCorrect(null);
  };

  // Card border reflects result after submission
  const borderColor = submitted
    ? isCorrect ? styleVariables.green : styleVariables.error
    : styleVariables.black;

  return (
    <View style={[styles.card, { borderColor }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.statLine} />

      {/* Code-style input row: prefix text + typed answer side by side */}
      <View style={styles.inputRow}>
        <Text style={styles.codePrefix}>{prefix}</Text>
        <TextInput
          style={[
            styles.codeInput,
            {
              // Green when correct, orange while typing / after wrong attempt
              color: submitted && isCorrect ? styleVariables.green : styleVariables.orange,
            },
          ]}
          value={value}
          onChangeText={setValue}
          autoCapitalize="none"
          autoCorrect={false}
          // Keep editable after a wrong attempt so the user can fix their answer
          editable={!submitted || !isCorrect}
          placeholder="..."
          placeholderTextColor={styleVariables.grey}
        />
      </View>

      {/* Inline feedback message */}
      {submitted && (
        <Text
          style={[
            styles.feedback,
            { color: isCorrect ? styleVariables.green : styleVariables.error },
          ]}
        >
          {isCorrect ? 'correct!' : `expected: ${answer}`}
        </Text>
      )}

      <View style={{ height: 16 }} />

      {/* Button switches to "retry" after a wrong answer */}
      <Button
        text={submitted && !isCorrect ? 'retry' : 'submit'}
        label_color={styleVariables.white}
        color={submitted && !isCorrect ? styleVariables.orange : styleVariables.green}
        height={36}
        width={219}
        action={submitted && !isCorrect ? handleRetry : handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    backgroundColor: styleVariables.white,
    borderRadius: 15,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderWidth: 2,
    marginBottom: 48,
  },
  title: {
    fontSize: 20,
    color: styleVariables.black,
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: 6,
  },
  statLine: {
    height: 3,
    backgroundColor: styleVariables.black,
    marginVertical: 6,
    borderRadius: 2,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: styleVariables.black,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: styleVariables.white,
  },
  codePrefix: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
    color: styleVariables.black,
  },
  codeInput: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
    flex: 1,
    // Remove default padding on Android so the text aligns with the prefix
    padding: 0,
    // Remove any blue focus outline on web
    outlineWidth: 0,
  } as any,
  feedback: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 12,
    marginTop: 8,
    paddingHorizontal: 4,
  },
});
