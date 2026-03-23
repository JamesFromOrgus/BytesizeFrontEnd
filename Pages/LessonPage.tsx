import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';
import TheoryBlock from '../Molecules/TheoryBlock';
import Toggle from '../Atoms/Toggle';
import MultiChoice from '../Molecules/MultiChoice';
import FillInTheBlanks from '../Molecules/FillInTheBlanks';
import Flashcards from '../Molecules/Flashcards';
import MatchTermToDefinition from '../Molecules/Match';

export default function LessonPage({ setPage }: PageProps) {
  return (
    <View style={styles.background}>
      <StatusBar style="auto" />

      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carousel}
      style={styles.carousel_container}
      >
        {
        <TheoryBlock
        title='what are variables?'
        theory_text="imagine a box. this box can contain any piece
of information about an object – number, word, list of groceries etc.

variables in python handle exactly the same thing!" 
callback={() => null}/>
      }

      <MultiChoice title='which of these can be stored in variables?' callback={void null} />

      <FillInTheBlanks title='complete string assignment' prefix='box=' answer='"shoe"' callback={void null} />
      <Flashcards title='review' cards={['vill you vear vigs?', 'oui', 'test']} callback={void null} />
      <MatchTermToDefinition 
        title="match terms to their definitions"
        pairs={[
          { term: "variable", definition: "a container for storing data" },
          { term: "string", definition: "text data in quotes" },
          { term: "integer", definition: "whole number" },
        ]}
        callback={(correct) => {
          console.log("Was correct:", correct);
        }}
      />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: styleVariables.white,
    paddingTop: 80
  },
  back_button: {
    position: 'absolute',
    top: 70,
    left: 24,
  },
  back_arrow: {
    fontSize: 32,
    color: styleVariables.black,
    fontFamily: 'Montserrat_600SemiBold',
  },
  h1: {
    fontSize: 36,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.orange,
    marginTop: 40,
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  carousel_container: {
    flexGrow: 0,
  },
  carousel: {
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: 'flex-start',
  },
  question_card: {
    width: 350,
    backgroundColor: styleVariables.white,
    borderRadius: 15,
    paddingTop: 24,
    paddingBottom: 44,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: styleVariables.black,
    marginRight: 16,
  },
  lesson_title: {
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
  lesson_description: {
    fontSize: 12,
    color: styleVariables.black,
    fontFamily: 'Montserrat_600SemiBold',
    lineHeight: 18,
    marginBottom: 20,
  },
});