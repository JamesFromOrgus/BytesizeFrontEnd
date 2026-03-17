import { StyleSheet, Text, View, Pressable, Image, ImageSourcePropType } from 'react-native';
import styleVariables from '../StyleVariables';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import Toggle from '../Atoms/Toggle';
import Button from '../Atoms/Button';

type OptionData = {
    text: string, 
}

export default function MultiChoiceOption({ text }: OptionData) {

    return (
        <View style={styles.question_card}>
        <Toggle width={36} />
        <Button height={36} text={text} label_color={styleVariables.black} color={styleVariables.white} action={() => null} />
        </View>
    );
}

const styles = StyleSheet.create({
    question_card: {
    backgroundColor: styleVariables.white,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderColor: styleVariables.black,
    marginRight: 16,
    flexDirection: 'row',
    gap: 6
  },
  button_container: {
    borderWidth: 2,
    borderColor: styleVariables.black,
    width: 250,
    height: 42,
    borderRadius: 16,
    overflow: 'hidden',
    },
   button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button_label: {
    fontFamily: 'Montserrat_600SemiBold',
  }
});