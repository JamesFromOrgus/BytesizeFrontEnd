import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import Button from '../Atoms/Button';
import styleVariables from '../StyleVariables';
import { PageProps } from '../App';
import { useProgress } from '../ProgressContext';

import { get_level_information, LevelInfo, pre_lesson_exp } from '../BackendConnectivity';

const { width } = Dimensions.get('window');

export default function LessonSuccessPage({ setPage }: PageProps) {
  const [levelInfo, setLevelInfo] = useState<LevelInfo | null>(null)
    
  useEffect(() => {
    async function load() {
      const level = await get_level_information();

      setLevelInfo(level);
    }

    load();
  }, []);

  const gainedXP = (levelInfo?.experience ?? 0) - pre_lesson_exp;
  const fillPercent = Math.max(0, Math.min(1, levelInfo == null ? 0 : (levelInfo.experience - levelInfo.lastRequiredExperience) / (levelInfo.nextRequiredExperience - levelInfo.lastRequiredExperience)));

  const { completeActiveLesson } = useProgress();

  // start completion logic once when this page loads
  useEffect(() => {
    completeActiveLesson();
  }, []);

  return (
    <View style={styles.background}>

      <View style={styles.card}>
        <Text style={styles.title}>success!</Text>
        <Text style={styles.subtitle}>{`+${gainedXP} xp`}</Text>

        <View style={styles.progressRow}>
          <Text style={styles.levelText}> {"level " + (levelInfo?.level ?? 0).toString()} </Text>
          <Text style={[styles.levelText, styles.levelTextInactive]}>{"level " + ((levelInfo?.level ?? 0)+1).toString()} </Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${fillPercent * 100}%` }]} />
        </View>

        <View style={styles.xpRow}>
          <Text style={styles.xpText}>{`${levelInfo?.lastRequiredExperience ?? 0}xp`}</Text>
          <Text style={styles.xpText}>{`${levelInfo?.nextRequiredExperience ?? 0}xp`}</Text>
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
