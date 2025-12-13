import { StyleSheet, Text, View, Pressable } from 'react-native';
import styleVariables from '../StyleVariables';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

type ButtonData = {
    text: string,
    color: string,
    label_color?: string,
    action: () => void
    width?: Int32,
    height?: Int32
}

export default function Button({ text, color, label_color, action, width, height }: ButtonData) {
    const default_label_color = '#fff'
    width = width ?? styles.button_container['width'];
    height = height ?? styles.button_container['height'];
    const container_style = {width: width, height: height}
    return (
        <View style={[styles.button_container, {backgroundColor: color}, container_style]}>
            <Pressable style={styles.button} onPress={action}>
                <Text style={[styles.button_label, {color: label_color ?? default_label_color, fontSize: height/2}]}>{text}</Text>
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
    fontFamily: 'Montserrat_600SemiBold',
  }
});
