import { StyleSheet, Text, View, Pressable, Image, ImageSourcePropType } from 'react-native';
import styleVariables from '../StyleVariables';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { useState } from 'react';

type ToggleData = {
    width?: number,
}

export default function Toggle({ width }: ToggleData) {
    const finalWidth = width ?? (styles.toggle_container.width as number);
    const container_style = { width: finalWidth, height: finalWidth, borderRadius: '50%'};

    const [currentState, setCurrentState] = useState(false);

    return (
        <View style={[styles.toggle_container, { backgroundColor: currentState ? styleVariables.green : styleVariables.white }, container_style]}>
            <Pressable style={styles.button} onPress={() => setCurrentState(!currentState)}/>
        </View>
    );
}

const styles = StyleSheet.create({
  toggle_container: {
    borderWidth: 2,
    borderColor: styleVariables.black,
    width: 250,
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
});