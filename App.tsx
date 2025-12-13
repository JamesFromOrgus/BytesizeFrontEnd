import { useFonts, Montserrat_600SemiBold } from '@expo-google-fonts/dev';
import LoginPage from './Pages/LoginPage';
import StartPage from './Pages/StartPage';
import RegisterPage from './Pages/RegisterPage';
import { useState } from 'react';

const pages = {
  'start': StartPage,
  'login': LoginPage,
  'register': RegisterPage
}
type PageName = keyof typeof pages;

export type PageProps = {
  setPage: React.Dispatch<React.SetStateAction<PageName>>;
};

export default function App() {
  const [currentPage, setPage] = useState<PageName>("start")
  const [fontsLoaded] = useFonts({Montserrat_600SemiBold});
  const Page = pages[currentPage] ?? pages['login'];
  return <Page setPage={setPage}/>;
}