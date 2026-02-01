import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

export default function CourseLessonsPage({ setPage }: PageProps) {
  return (
    <View style={styles.background}>
      <Text style={styles.h2Black}>Course Lessons Page</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: styleVariables.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    h1: {
        fontSize: 36,
        fontFamily: 'Montserrat_600SemiBold',
        color: styleVariables.white
    },
    h2: {
        fontSize: 24,
        fontFamily: 'Montserrat_600SemiBold',
        color: styleVariables.white
    },
    h2Black: {
        fontSize: 24,
        fontFamily: 'Montserrat_600SemiBold',
        color: styleVariables.black
    },
    text: {
        fontSize: 12,
        fontFamily: 'Montserrat_600SemiBold',
        color: styleVariables.white
    },
    error_text: {
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        color: styleVariables.error,
        marginTop: 24
    }
});