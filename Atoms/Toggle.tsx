import { StyleSheet, Pressable, View } from 'react-native';
import styleVariables from '../StyleVariables';
import { useState } from 'react';

type ToggleData = {
  width?: number;
  checked?: boolean;
  onChange?: (val: boolean) => void;
};

export default function Toggle({ width, checked, onChange }: ToggleData) {
  const [internal, setInternal] = useState(false);
  const finalWidth = width ?? 36;
  const isOn = checked !== undefined ? checked : internal;

  const handlePress = () => {
    const next = !isOn;
    setInternal(next);
    onChange?.(next);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.circle,
        {
          width: finalWidth,
          height: finalWidth,
          borderRadius: finalWidth / 2,
          backgroundColor: isOn ? styleVariables.green : styleVariables.white,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  circle: {
    borderWidth: 2,
    borderColor: styleVariables.black,
    overflow: 'hidden',
  },
});