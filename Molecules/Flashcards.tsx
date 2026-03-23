import { StyleSheet, Text, View, Pressable } from 'react-native';
import styleVariables from '../StyleVariables';
import { useState } from 'react';

type FlashcardsData = {
  title: string;
  cards: string[];   // question/term strings shown on each card
  callback: () => void;
};

export default function Flashcards({ title, cards, callback }: FlashcardsData) {
  const [index, setIndex] = useState(0);

  const goBack = () => setIndex(i => Math.max(0, i - 1));
  const goNext = () => {
    if (index === cards.length - 1) {
      callback();
    } else {
      setIndex(i => i + 1);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.statLine} />

      {/* Flashcard display */}
      <View style={styles.flashCard}>
        <Text style={styles.flashText}>{cards[index]}</Text>
      </View>

      {/* Navigation row */}
      <View style={styles.navRow}>
        <Pressable onPress={goBack} style={styles.arrowBtn}>
          <Text style={[styles.arrow, { color: index === 0 ? styleVariables.grey : styleVariables.green }]}>
            ←
          </Text>
        </Pressable>

        <View style={styles.counterPill}>
          <Text style={styles.counterText}>{index + 1}/{cards.length}</Text>
        </View>

        <Pressable onPress={goNext} style={styles.arrowBtn}>
          <Text style={[styles.arrow, { color: styleVariables.green }]}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    backgroundColor: styleVariables.white,
    borderRadius: 15,
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: styleVariables.black,
    marginRight: 16,
  },
  title: {
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
    marginBottom: 16,
  },
  flashCard: {
    borderWidth: 2,
    borderColor: styleVariables.black,
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    marginBottom: 20,
  },
  flashText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
    color: styleVariables.black,
    textAlign: 'center',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowBtn: {
    padding: 8,
  },
  arrow: {
    fontSize: 28,
    fontFamily: 'Montserrat_600SemiBold',
  },
  counterPill: {
    borderWidth: 2,
    borderColor: styleVariables.black,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
  counterText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 13,
    color: styleVariables.black,
  },
});