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
import LessonSuccessPage from './Pages/LessonSuccessPage';
import SettingsPage from './Pages/SettingsPage';

const pages = {
  start: StartPage,
  login: LoginPage,
  register: RegisterPage,
  onboarding: OnboardingPage,
  home: HomePage,
  account: AccountPage,
  course: CoursePage,
  success: LessonSuccessPage,
  settings: SettingsPage
} as const;

type PageName = keyof typeof pages;

export type PageProps = {
  setPage: React.Dispatch<React.SetStateAction<PageName>>;
};

const { width } = Dimensions.get('window');

export default function App() {
  const [fontsLoaded] = useFonts({ Montserrat_600SemiBold });
  const listRef = useRef<FlatList<PageName>>(null);

  // History stack: start -> (login|register) -> onboarding
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

  // Your existing API: pages call setPage('login') etc.
  // Patched: if user swiped back, discard "future" pages before navigating.
  const setPage: PageProps['setPage'] = (next) => {
    const target = resolveNext(next);

    setStack((prevStack): PageName[] => {
      // IMPORTANT: if user swiped back, throw away "future" pages
      const baseStack: PageName[] = prevStack.slice(0, currentIndex + 1);

      const last = baseStack[baseStack.length - 1];
      const secondLast = baseStack[baseStack.length - 2];

      // Helper: jump back if target already exists in *base* history
      const existingIndex = baseStack.lastIndexOf(target);
      if (existingIndex !== -1) {
        const trimmed: PageName[] = baseStack.slice(0, existingIndex + 1);

        requestAnimationFrame(() => {
          setCurrentIndex(trimmed.length - 1);
          scrollTo(trimmed.length - 1);
        });

        return trimmed;
      }

      // Branch behaviour:
      // If we're currently on login/register and the user switches between them,
      // replace the top of the stack rather than pushing a new page.
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

      // If we're on onboarding and they navigate to login/register (rare but possible),
      // replace the branch page (the page before onboarding) and keep onboarding.
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

      // Default: push target onto the history stack
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

    // "No forward motion" rule:
    // You can only swipe to an index <= currentIndex.
    if (idx > currentIndex) {
      scrollTo(currentIndex);
      return;
    } else if (idx < currentIndex) {
      setStack((prevStack): PageName[] => {
        const trimmed = prevStack.slice(0, -1);
        return trimmed;
      })
    }

    // Back swipe allowed
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
