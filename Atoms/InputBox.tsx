import { StyleSheet, Text, View, Pressable, TextInput, TextInputProps } from 'react-native';
import styleVariables from '../StyleVariables';

type InputBoxData = {
    placeholder_text: string,
    autocomplete_hint?: TextInputProps["autoComplete"];
    obfuscated?: boolean
}

export default function InputBox({ placeholder_text, autocomplete_hint, obfuscated }: InputBoxData) {
    return (
        <TextInput
        style={[styles.input_box_container, styles.placeholder_label]}
        placeholder={placeholder_text}
        placeholderTextColor={styleVariables.grey}
        autoComplete={autocomplete_hint ?? 'username'}
        autoCapitalize='none'
        secureTextEntry={obfuscated ?? false}
        autoCorrect={false}
        />
    );
}

const styles = StyleSheet.create({
  input_box_container: {
    outlineWidth: 2,
    outlineColor: styleVariables.black,
    backgroundColor: styleVariables.white,
    color: styleVariables.black,
    width: 300,
    height: 42,
    opacity: 1,
    borderRadius: 16
  },
  placeholder_label: {
    paddingLeft: 12,
    fontSize: 20,
    fontFamily: 'Montserrat_600SemiBold',
  }
});
