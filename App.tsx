import React, { useState, useRef, useEffect} from 'react';
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

// Import ProgressProvider for global state 
import {ProgressProvider} from './ProgressContext';

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

  // Doesn't allow for more than one scroll by timeing the user out (not pretty)
  useEffect(() => {
    if (listRef.current && stack.length > 0) {
      // Use a slight timeout to ensure FlatList has digested the new data length
      setTimeout(() => {
        listRef.current?.scrollToIndex({ index: currentIndex, animated: true });
      }, 50); 
    }
  }, [currentIndex, stack.length]);

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
      const baseStack = prevStack.slice(0, currentIndex + 1);
      const last = baseStack[baseStack.length - 1];
      const secondLast = baseStack[baseStack.length - 2];

      let newStack: PageName[];
      let newIndex: number;

      // Logout root reset (prevents user from swiping left back into the stack)
      if (target === 'start') {
        newStack = ['start'];
        newIndex = 0;
      }
      // Clears login page history and sets up home as root
      else if (target === 'home') {
        newStack = ['home'];
        newIndex = 0;
        
        // Appends the account page after the transition animation is complete
        setTimeout(() => {
          setStack((current) => {
            if (current.includes('home') && !current.includes('account')) {
              return ['home', 'account'];
            }
            return current;
          });
        }, 500); 
      }
      else if (target === 'account') {
        newStack = ['home', 'account'];
        newIndex = 1;
      }

      // If page already exists in stack, jump back to it
      else if (baseStack.lastIndexOf(target) !== -1) {
        const existingIndex = baseStack.lastIndexOf(target);
        newStack = baseStack.slice(0, existingIndex + 1);
        newIndex = newStack.length - 1;
      }
      // replacement logic for the login pages
      else if (
        (last === 'login' || last === 'register') &&
        (target === 'login' || target === 'register')
      ) {
        newStack = [...baseStack.slice(0, -1), target];
        newIndex = newStack.length - 1;
      }
      else if (
        last === 'onboarding' &&
        (target === 'login' || target === 'register') &&
        (secondLast === 'login' || secondLast === 'register')
      ) {
        newStack = [...baseStack.slice(0, -2), target, 'onboarding'];
        newIndex = newStack.length - 1;
      }
      // pushing the new page to the stack
      else {
        newStack = [...baseStack, target];
        newIndex = newStack.length - 1;
      }

      // Safely update index outside of the return statement
      // React batches these state updates, triggering the useEffect safely
      setCurrentIndex(newIndex);
      return newStack;
    });
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    
    if (idx !== currentIndex) {
      if (idx >= stack.length) {
        // Prevents user from swiping forward
        listRef.current?.scrollToIndex({ index: currentIndex, animated: true });
      } else if (idx > currentIndex) {

        setCurrentIndex(idx);
      } else if (idx < currentIndex) {
        // Checks  if we are doing a speciecal main page swipe back
        const isMainPagesSwipe = stack[currentIndex] === 'account' && stack[idx] === 'home';
        

        if (stack[idx] === 'home') {
          // If user swipes back and lands on home this restores the root state to home
          setStack(['home', 'account']);
        } else if (!isMainPagesSwipe) {
          // swipe back
          setStack((prevStack) => prevStack.slice(0, idx + 1));
        }
        setCurrentIndex(idx);
      }
    }
  };

  if (!fontsLoaded) return null;

  return (
    <ProgressProvider>
      <FlatList
        ref={listRef}
        data={stack} 
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
        // fast mounting when appending items to the end of the list
        initialNumToRender={1}
        maxToRenderPerBatch={2}
      />
    </ProgressProvider>
  );
}