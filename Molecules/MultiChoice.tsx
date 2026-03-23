import { StyleSheet, Text, View, Pressable, TextInput, TextInputProps } from 'react-native';
import styleVariables from '../StyleVariables';
import Button from '../Atoms/Button';
import MultiChoiceOption from './MultiChoiceOption';

type MultiChoiceData = {
    title: string,
    //theory_text: string,  do an array
    callback: () => void,
}

export default function MultiChoice({ title, callback }: MultiChoiceData) {
    return (
        <View style={styles.question_card}>
            <Text style={styles.theory_title}>{title}</Text>
            <View style={styles.statLine} />
            <MultiChoiceOption text='integer' />
            <MultiChoiceOption text='string' />
            <MultiChoiceOption text='shoe' />
            <View style={{height: 12}} />
            <Button
              text="submit"
              label_color={styleVariables.white}
              color={styleVariables.green}
              height={36}
              width={219}
              action={callback}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  question_card: {
    width: 350,
    backgroundColor: styleVariables.white,
    borderRadius: 15,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: styleVariables.black,
    marginRight: 16,
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