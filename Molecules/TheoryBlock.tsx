import { StyleSheet, Text, View, Pressable, TextInput, TextInputProps } from 'react-native';
import { useState } from 'react';
import styleVariables from '../StyleVariables';
import Button from '../Atoms/Button';

type TheoryBlockData = {
    title: string,
    theory_text: string,
    callback: () => void,
}

export default function TheoryBlock({ title, theory_text, callback }: TheoryBlockData) {
    // Add state to track if the button has been pressed
    const [isPressed, setIsPressed] = useState(false);

    return (
        <View style={styles.question_card}>
            <Text style={styles.theory_title}>{title}</Text>
            <View style={styles.statLine} />
            <Text style={styles.theory_text}>{theory_text}</Text>
            <Button
              text="got it!"
              label_color={styleVariables.white}
              // Change color to grey if pressed to indicate it's disabled
              color={isPressed ? styleVariables.grey : styleVariables.green}
              height={36}
              width={219}
              action={() => {
                // Only fire the callback and update state if it hasn't been pressed yet
                if (!isPressed) {
                  setIsPressed(true);
                  callback();
                }
              }}
            />
          </View>
    )
}

const styles = StyleSheet.create({
  question_card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: styleVariables.white,
    borderRadius: 15,
    paddingTop: 24,
    paddingBottom: 44,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: styleVariables.black,
    marginBottom: 48
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
  },
  theory_text: {
    fontSize: 12,
    color: styleVariables.black,
    fontFamily: 'Montserrat_600SemiBold',
    lineHeight: 18,
    marginBottom: 20,
  },
});