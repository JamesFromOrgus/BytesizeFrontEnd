import React, { createContext, useState, useContext } from 'react';

// The master list of all lessons in python for beginners
// If we are to make new courses we would add the list and import the relevant lesson id's for each course
const initialLessons = [
  {
    id: '1',
    title: 'lesson 1\nintroduction',
    description: 'in this lesson we will introduce you to python, its basics and application, and how to get started.',
    status: 'not started',
    pageKey: 'lesson1',
  },
  {
    id: '2',
    title: 'lesson 2\nvariables',
    description: 'learn how variables work in python and how they store and manipulate data.',
    status: 'not started',
    pageKey: 'lesson2',
  },
  {
    id: '3',
    title: 'lesson 3\nsimple\noperators',
    description: 'learn about special symbols in python that perform actions on values and variables.',
    status: 'not started',
    pageKey: 'lesson3',
  },
  {
    id: '4',
    title: 'lesson 4\nadvanced\noperators',
    description: 'learn about advanced special symbols in python that perform actions on values and variables.',
    status: 'not started',
    pageKey: 'lesson4',
  },
  {
    id: '5',
    title: 'lesson 5\nconditionals',
    description: 'learn about conditional statements in python to make program decisions.',
    status: 'not started',
    pageKey: 'lesson5',
  },
  {
    id: '6',
    title: 'lesson 6\nsimple\nloops',
    description: 'in this lesson you will learn how to use loops with python, and demistify for and while keywords.',
    status: 'not started',
    pageKey: 'lesson6',
  },
  {
    id: '7',
    title: 'lesson 7\nadvanced\nloops',
    description: 'in this lesson you will learn how to use advanced loops with python, and demistify for and while keywords.',
    status: 'not started',
    pageKey: 'lesson7',
  },
  {
    id: '8',
    title: 'lesson 8\ninput',
    description: 'this lesson will teach you how to take input from users and apply it in your programs.',
    status: 'not started',
    pageKey: 'lesson8',
  },
  {
    id: '9',
    title: 'lesson 9\nfunctions\npart 1',
    description: 'learn how to use functions in python.',
    status: 'not started',
    pageKey: 'lesson9',
  },
  {
    id: '10',
    title: 'lesson 10\nadvanced\nfunctions',
    description: 'learn how to use functions in python extensively.',
    status: 'not started',
    pageKey: 'lesson10',
  },
  {
    id: '11',
    title: 'lesson 11\nlists',
    description: 'learn how to use lists and data structures in python.',
    status: 'not started',
    pageKey: 'lesson11',
  },
] as const;

// defines the shape of a single lesson so TypeScript is happy
export type Lesson = {
  id: string;
  title: string;
  description: string;
  status: string;
  pageKey: string;
};

// Defines the shape of the data and functions we are making globally available
type LessonContextType = {
  courseLessons: Lesson[];
  setCourseLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
  setActiveLessonId: (id: string) => void;
  completeActiveLesson: () => void;
};

// Creating the context
const ProgressContext = createContext<LessonContextType | null>(null);

// Creating the Provider component that will wrap the App
export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  // creating the state with the static array above
  const [courseLessons, setCourseLessons] = useState<Lesson[]>(
    initialLessons.map((l) => ({ ...l, status: l.status as string }))
  );
  
  // Track which lesson the user is currently looking at
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // This finds the active lesson and marks it as complete
  const completeActiveLesson = () => {
    if (!activeLessonId) return;
    
    setCourseLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === activeLessonId ? { ...lesson, status: 'complete' } : lesson
      )
    );
  };

  return (
    <ProgressContext.Provider 
      value={{ 
        courseLessons, 
        setCourseLessons,
        setActiveLessonId, 
        completeActiveLesson 
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

// Custom hook to make it to grab this data from any file
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};