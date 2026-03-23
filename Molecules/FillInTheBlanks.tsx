import { StyleSheet, Text, View, TextInput } from 'react-native';
import styleVariables from '../StyleVariables';
import Button from '../Atoms/Button';
import { useState } from 'react';

type FillInTheBlanksData = {
  title: string;
  // The prompt shown inside the input, with a blank to fill.
  // Pass segments: plain text + the expected answer.
  prefix: string;
  answer: string;
  callback: (correct: boolean) => void;
};

export default function FillInTheBlanks({ title, prefix, answer, callback }: FillInTheBlanksData) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    const correct = value.trim() === answer.trim();
    setIsCorrect(correct);
    setSubmitted(true);
    callback(correct);
  };

  const handleRetry = () => {
    setValue('');
    setSubmitted(false);
    setIsCorrect(null);
  };

  const borderColor = submitted
    ? isCorrect ? styleVariables.green : styleVariables.error
    : styleVariables.black;

  return (
    <View style={[styles.card, { borderColor }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.statLine} />

      {/* Code-style input row */}
      <View style={styles.inputRow}>
        <Text style={styles.codePrefix}>{prefix}</Text>
        <TextInput
          style={[styles.codeInput, { color: submitted && isCorrect ? styleVariables.green : styleVariables.orange }]}
          value={value}
          onChangeText={setValue}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!submitted || !isCorrect}
          placeholder="..."
          placeholderTextColor={styleVariables.grey}
        />
      </View>

      {submitted && (
        <Text style={[styles.feedback, { color: isCorrect ? styleVariables.green : styleVariables.error }]}>
          {isCorrect ? 'correct!' : `expected: ${answer}`}
        </Text>
      )}

      <View style={{ height: 16 }} />
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
    borderColor: styleVariables.black,
    marginRight: 16,
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
    color: styleVariables.orange,
    flex: 1,
    padding: 0,
  },
  feedback: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 12,
    marginTop: 8,
    paddingHorizontal: 4,
  },
});