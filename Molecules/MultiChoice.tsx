import { StyleSheet, Text, View, Pressable } from 'react-native';
import styleVariables from '../StyleVariables';
import Button from '../Atoms/Button';
import { useState } from 'react';
import { complete_question } from '../BackendConnectivity';

// Each option carries the display text and whether it is the correct answer
export type OptionItem = {
  text: string;
  correct: boolean;
};

type MultiChoiceData = {
  title: string;
  options: OptionItem[];
  callback: (correct: boolean) => void;
};

export default function MultiChoice({ title, options, callback }: MultiChoiceData) {
  // Index of the currently highlighted option (null = nothing picked yet)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // Locked once the user presses "submit"
  const [submitted, setSubmitted] = useState(false);

  const handleOptionPress = (index: number) => {
    if (submitted) return;
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex === null || submitted) return;
    setSubmitted(true);
    callback(options[selectedIndex].correct);
    if (options[selectedIndex].correct) complete_question(true);
  };

  const handleRetry = () => {
    setSelectedIndex(null);
    setSubmitted(false);
  };

  const isCorrectAnswer = selectedIndex !== null && options[selectedIndex].correct;

  // Card border turns green/red after submission
  const cardBorderColor = submitted
    ? isCorrectAnswer ? styleVariables.green : styleVariables.error
    : styleVariables.black;

  return (
    <View style={[styles.question_card, { borderColor: cardBorderColor }]}>
      <Text style={styles.theory_title}>{title}</Text>
      <View style={styles.statLine} />

      {options.map((option, index) => {
        // Compute per-pill colour
        let pillBg = styleVariables.white;
        let pillBorder = styleVariables.black;
        let textColor = styleVariables.black;

        if (submitted) {
          if (option.correct) {
            pillBg = styleVariables.green;
            textColor = styleVariables.white;
          } else if (index === selectedIndex) {
            pillBg = styleVariables.error;
            textColor = styleVariables.white;
          }
        } else if (index === selectedIndex) {
          pillBg = styleVariables.active_blue;
          pillBorder = styleVariables.blue;
        }

        return (
          <Pressable
            key={index}
            onPress={() => handleOptionPress(index)}
            style={[styles.option_pill, { backgroundColor: pillBg, borderColor: pillBorder }]}
          >
            <Text style={[styles.option_text, { color: textColor }]}>{option.text}</Text>
          </Pressable>
        );
      })}

      <View style={{ height: 12 }} />

      {submitted && !isCorrectAnswer ? (
        <Button
          text="retry"
          label_color={styleVariables.white}
          color={styleVariables.orange}
          height={36}
          width={219}
          action={handleRetry}
        />
      ) : (
        <Button
          text="submit"
          label_color={styleVariables.white}
          color={selectedIndex !== null && !submitted ? styleVariables.green : styleVariables.grey}
          height={36}
          width={219}
          action={handleSubmit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  question_card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: styleVariables.white,
    borderRadius: 15,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderWidth: 2,
    marginBottom: 48,
  },
  theory_title: {
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
    marginBottom: 14,
  },
  option_pill: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  option_text: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 13,
  },
});