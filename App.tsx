import React, { useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useFonts, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';

import LoginPage from './Pages/LoginPage';
import StartPage from './Pages/StartPage';
import RegisterPage from './Pages/RegisterPage';
import OnboardingPage from './Pages/OnboardingPage';
import HomePage from './Pages/HomePage';
import AccountPage from './Pages/AccountPage';
import CoursePage from './Pages/CourseLessonsPage';
import SettingsPage from './Pages/SettingsPage';
import LessonPage from './Pages/LessonPage';
import LessonSuccessPage from './Pages/LessonSuccessPage';

// Individual lesson pages — add content to each file as needed
import Lesson1 from './Pages/Lesson1';
import Lesson2 from './Pages/Lesson2';
import Lesson3 from './Pages/Lesson3';
import Lesson4 from './Pages/Lesson4';
import Lesson5 from './Pages/Lesson5';
import Lesson6 from './Pages/Lesson6';
import Lesson7 from './Pages/Lesson7';
import Lesson8 from './Pages/Lesson8';
import Lesson9 from './Pages/Lesson9';
import Lesson10 from './Pages/Lesson10';
import Lesson11 from './Pages/Lesson11';

const pages = {
  start: StartPage,
  login: LoginPage,
  register: RegisterPage,
  onboarding: OnboardingPage,
  home: HomePage,
  account: AccountPage,
  course: CoursePage,
  settings: SettingsPage,
  lesson: LessonPage,
  success: LessonSuccessPage,
  // Individual lesson pages — each card on CourseLessonsPage routes here
  lesson1: Lesson1,
  lesson2: Lesson2,
  lesson3: Lesson3,
  lesson4: Lesson4,
  lesson5: Lesson5,
  lesson6: Lesson6,
  lesson7: Lesson7,
  lesson8: Lesson8,
  lesson9: Lesson9,
  lesson10: Lesson10,
  lesson11: Lesson11,
} as const;

type PageName = keyof typeof pages;

export type PageProps = {
  setPage: React.Dispatch<React.SetStateAction<PageName>>;
};

const { width } = Dimensions.get('window');

export default function App() {
  const [fontsLoaded] = useFonts({ Montserrat_600SemiBold });
  const listRef = useRef<FlatList<PageName>>(null);

  // History stack: start → (login|register) → onboarding
  const [stack, setStack] = useState<PageName[]>(['start']);
  // Where the user currently is in the stack (can be earlier if they swiped back)
  const [currentIndex, setCurrentIndex] = useState(0);

  const resolveNext = (next: React.SetStateAction<PageName>): PageName => {
    const currentPage = stack[currentIndex] ?? stack[stack.length - 1];
    return typeof next === 'function'
      ? (next as (p: PageName) => PageName)(currentPage)
      : next;
  };

  const scrollTo = (index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
  };

  const setPage: PageProps['setPage'] = (next) => {
    const target = resolveNext(next);
    console.log(next);

    setStack((prevStack): PageName[] => {
      const baseStack: PageName[] = prevStack.slice(0, currentIndex + 1);
      const last = baseStack[baseStack.length - 1];
      const secondLast = baseStack[baseStack.length - 2];

      const existingIndex = baseStack.lastIndexOf(target);
      if (existingIndex !== -1) {
        const trimmed: PageName[] = baseStack.slice(0, existingIndex + 1);
        requestAnimationFrame(() => {
          setCurrentIndex(trimmed.length - 1);
          scrollTo(trimmed.length - 1);
        });
        return trimmed;
      }

      if (
        (last === 'login' || last === 'register') &&
        (target === 'login' || target === 'register')
      ) {
        const replaced: PageName[] = [...baseStack.slice(0, -1), target];
        requestAnimationFrame(() => {
          setCurrentIndex(replaced.length - 1);
          scrollTo(replaced.length - 1);
        });
        return replaced;
      }

      if (
        last === 'onboarding' &&
        (target === 'login' || target === 'register') &&
        (secondLast === 'login' || secondLast === 'register')
      ) {
        const adjusted: PageName[] = [...baseStack.slice(0, -2), target, 'onboarding'];
        requestAnimationFrame(() => {
          setCurrentIndex(adjusted.length - 1);
          scrollTo(adjusted.length - 1);
        });
        return adjusted;
      }

      const pushed: PageName[] = [...baseStack, target];
      requestAnimationFrame(() => {
        setCurrentIndex(pushed.length - 1);
        scrollTo(pushed.length - 1);
      });
      return pushed;
    });
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    if (idx > currentIndex) {
      scrollTo(currentIndex);
      return;
    } else if (idx < currentIndex) {
      setStack((prevStack): PageName[] => prevStack.slice(0, -1));
    }
    setCurrentIndex(idx);
  };

  const data = useMemo(() => stack, [stack]);

  if (!fontsLoaded) return null;

  return (
    <FlatList
      ref={listRef}
      data={data}
      keyExtractor={(item, index) => `${item}-${index}`}
      horizontal
      pagingEnabled
      bounces={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const Page = pages[item];
        return (
          <View style={{ width }}>
            <Page setPage={setPage} />
          </View>
        );
      }}
      onMomentumScrollEnd={onMomentumScrollEnd}
      getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
    />
  );
}
