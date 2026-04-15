import { StyleSheet, Text, View, Pressable } from 'react-native';
import styleVariables from '../StyleVariables';
import { useState } from 'react';

type MatchPair = {
  term: string;
  definition: string;
};

type MatchTermToDefinitionData = {
  title: string;
  pairs: MatchPair[];
  callback: (correct: boolean) => void;
};

export default function MatchTermToDefinition({ title, pairs, callback }: MatchTermToDefinitionData) {
  // Track which definition has been dropped into which term slot
  // key: term, value: definition string or null
  const [matched, setMatched] = useState<Record<string, string | null>>(
    () => Object.fromEntries(pairs.map(p => [p.term, null]))
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // All definitions shuffled once on mount
  const [pool] = useState<string[]>(() =>
    [...pairs.map(p => p.definition)].sort(() => Math.random() - 0.5)
  );

  const usedDefinitions = new Set(Object.values(matched).filter(Boolean) as string[]);

  const handleSlotPress = (term: string) => {
    if (submitted) return;
    if (selected) {
      // Place selected definition into this slot
      // If slot already had something, return it to pool (just clear it)
      setMatched(prev => ({ ...prev, [term]: selected }));
      setSelected(null);
    } else if (matched[term]) {
      // Tap a filled slot to unset it
      setMatched(prev => ({ ...prev, [term]: null }));
    }
  };

  const handlePoolPress = (def: string) => {
    if (submitted) return;
    setSelected(prev => prev === def ? null : def);
  };

  const handleSubmit = () => {
    const correct = pairs.every(p => matched[p.term] === p.definition);
    setIsCorrect(correct);
    setSubmitted(true);
    callback(correct);
  };

  const handleRetry = () => {
    setMatched(Object.fromEntries(pairs.map(p => [p.term, null])));
    setSelected(null);
    setSubmitted(false);
    setIsCorrect(null);
  };

  const allFilled = pairs.every(p => matched[p.term] !== null);

  const borderColor = submitted
    ? isCorrect ? styleVariables.green : styleVariables.error
    : styleVariables.black;

  return (
    <View style={[styles.card, { borderColor }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.statLine} />

      {/* Term + slot pairs */}
      {pairs.map(({ term }) => (
        <View key={term} style={styles.pairCard}>
          {/* Term pill */}
          <View style={styles.termPill}>
            <Text style={styles.termText}>{term}</Text>
          </View>

          {/* Definition slot */}
          <Pressable
            style={[
              styles.slot,
              matched[term] ? styles.slotFilled : styles.slotEmpty,
              selected && !matched[term] ? styles.slotHighlight : {},
            ]}
            onPress={() => handleSlotPress(term)}
          >
            {matched[term] ? (
              <Text style={styles.slotFilledText}>{matched[term]}</Text>
            ) : null}
          </Pressable>
        </View>
      ))}

      <View style={{ height: 12 }} />

      {/* Definition pool */}
      <View style={styles.poolCard}>
        {pool.map(def => {
          const isUsed = usedDefinitions.has(def);
          const isSelectedItem = selected === def;
          return (
            <Pressable
              key={def}
              style={[
                styles.defPill,
                isUsed && styles.defPillUsed,
                isSelectedItem && styles.defPillSelected,
              ]}
              onPress={() => !isUsed && handlePoolPress(def)}
            >
              <Text style={[styles.defText, isUsed && styles.defTextUsed]}>
                {def}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {submitted && (
        <Text style={[styles.feedback, { color: isCorrect ? styleVariables.green : styleVariables.error }]}>
          {isCorrect ? 'correct!' : 'not quite – try again?'}
        </Text>
      )}

      <View style={{ height: 16 }} />

      {submitted && !isCorrect ? (
        <View style={styles.btnRow}>
          <Pressable onPress={handleRetry}>
            <View style={[styles.btnWrap, { backgroundColor: styleVariables.orange }]}>
              <Text style={styles.btnLabel}>retry</Text>
            </View>
          </Pressable>
        </View>
      ) : (
        <View style={styles.btnRow}>
          <Pressable onPress={allFilled && !submitted ? handleSubmit : undefined}>
            <View style={[styles.btnWrap, { backgroundColor: allFilled ? styleVariables.green : styleVariables.grey }]}>
              <Text style={styles.btnLabel}>{submitted && isCorrect ? 'next →' : 'submit'}</Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: styleVariables.white,
    borderRadius: 15,
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: styleVariables.black,
    marginBottom: 48,
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
    marginBottom: 12,
  },
  pairCard: {
    borderWidth: 2,
    borderColor: styleVariables.black,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    gap: 8,
  },
  termPill: {
    backgroundColor: styleVariables.blue,
    borderWidth: 2,
    borderColor: styleVariables.black,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  termText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 13,
    color: styleVariables.white,
  },
  slot: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotEmpty: {
    borderColor: styleVariables.black,
    backgroundColor: styleVariables.grey,
    borderStyle: 'dashed',
  },
  slotFilled: {
    borderColor: styleVariables.black,
    backgroundColor: styleVariables.active_green,
  },
  slotHighlight: {
    borderColor: styleVariables.green,
    borderStyle: 'dashed',
  },
  slotFilledText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 12,
    color: styleVariables.white,
    textAlign: 'center',
  },
  poolCard: {
    borderWidth: 2,
    borderColor: styleVariables.black,
    borderRadius: 12,
    padding: 10,
    gap: 8,
  },
  defPill: {
    borderWidth: 2,
    borderColor: styleVariables.black,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: styleVariables.white,
  },
  defPillUsed: {
    opacity: 0.3,
  },
  defPillSelected: {
    backgroundColor: styleVariables.active_blue,
    borderColor: styleVariables.blue,
  },
  defText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 12,
    color: styleVariables.black,
    textAlign: 'center',
  },
  defTextUsed: {
    color: styleVariables.grey,
  },
  feedback: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 12,
    marginTop: 10,
    paddingHorizontal: 4,
  },
  btnRow: {
    alignItems: 'flex-start',
  },
  btnWrap: {
    width: 219,
    height: 36,
    borderWidth: 2,
    borderColor: styleVariables.black,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLabel: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 36 / 2.2,
    color: styleVariables.white,
  },
});