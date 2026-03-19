import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';

const { width } = Dimensions.get('window');

export default function LessonSuccessPage({ setPage }: PageProps) {
  const currentXP = 3566;
  const goalXP = 5000;
  const gainedXP = goalXP - currentXP;
  const fillPercent = Math.max(0, Math.min(1, currentXP / goalXP));

  return (
    <View style={styles.background}>

      <View style={styles.card}>
        <Text style={styles.title}>success!</Text>
        <Text style={styles.subtitle}>{`+${gainedXP} xp`}</Text>

        <View style={styles.progressRow}>
          <Text style={styles.levelText}>level 4</Text>
          <Text style={[styles.levelText, styles.levelTextInactive]}>level 5</Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${fillPercent * 100}%` }]} />
        </View>

        <View style={styles.xpRow}>
          <Text style={styles.xpText}>{`${currentXP}xp`}</Text>
          <Text style={styles.xpText}>{`${goalXP}xp`}</Text>
        </View>

        <Button
          text="homepage"
          color={styleVariables.orange}
          action={() => setPage('home')}
          width={width * 0.7}
          height={50}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: styleVariables.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mutedLabel: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
    color: styleVariables.grey,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 28,
  },
  card: {
    width: '85%',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 12,
  },
  icon: {
    width: 92,
    height: 92,
    marginTop: -12,
    marginBottom: -4,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.black,
    textTransform: 'lowercase',
    margin: 12,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.black,
    opacity: 1,
  },
  progressRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelText: {
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.black,
  },
  levelTextInactive: {
    opacity: 0.4,
  },
  progressBarBackground: {
    width: '100%',
    height: 16,
    borderRadius: 12,
    backgroundColor: styleVariables.grey,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: styleVariables.green,
  },
  xpRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xpText: {
    fontSize: 12,
    fontFamily: 'Montserrat_600SemiBold',
    color: styleVariables.black,
    opacity: 0.7,
  },
});
