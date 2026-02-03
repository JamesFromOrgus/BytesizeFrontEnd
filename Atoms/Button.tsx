import { StyleSheet, Text, View, Pressable, Image, ImageSourcePropType } from 'react-native';
import styleVariables from '../StyleVariables';

type ButtonData = {
    text?: string, 
    color: string,
    label_color?: string,
    action: () => void,
    width?: number,
    height?: number,
    image_source?: ImageSourcePropType
}

export default function Button({ text, color, label_color, action, width, height, image_source }: ButtonData) {
    const default_label_color = '#fff';
    const finalWidth = width ?? (styles.button_container.width as number);
    const finalHeight = height ?? (styles.button_container.height as number);
    const container_style = { width: finalWidth, height: finalHeight };

    return (
        <View style={[styles.button_container, { backgroundColor: color }, container_style]}>
            <Pressable style={styles.button} onPress={action}>
                {image_source ? (
                    <Image 
                        source={image_source} 
                        style={{ width: finalHeight * 0.7, height: finalHeight * 0.7 }} 
                        resizeMode="contain" 
                    />
                ) : (
                    <Text style={[
                        styles.button_label, 
                        { color: label_color ?? default_label_color, fontSize: finalHeight / 2.2 }
                    ]}>
                        {text}
                    </Text>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
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