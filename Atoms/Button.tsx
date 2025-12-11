import { StyleSheet, Text, View, Pressable } from 'react-native';
import styleVariables from '../StyleVariables';

type ButtonData = {
    text: string,
    color: string,
    label_color?: string,
    action: () => void
}

export default function Button({ text, color, label_color, action }: ButtonData) {
    const default_label_color = '#fff'
    return (
        <View style={[styles.button_container, {backgroundColor: color}]}>
            <Pressable style={styles.button} onPress={action}>
                <Text style={[styles.button_label, {color: label_color ?? default_label_color}]}>{text}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  button_container: {
    outlineWidth: 2,
    outlineColor: styleVariables.black,
    width: 250,
    height: 42,
    opacity: 1,
    borderRadius: 16
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
    fontSize: 20,
    fontFamily: 'Montserrat_600SemiBold',
  }
});
