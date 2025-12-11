import { useFonts, Montserrat_600SemiBold } from '@expo-google-fonts/dev';
import LoginPage from './Pages/LoginPage';
import StartPage from './Pages/StartPage';
import { useState } from 'react';

const pages = {
  'start': StartPage,
  'login': LoginPage
}
type PageName = keyof typeof pages;

export type PageProps = {
  setPage: React.Dispatch<React.SetStateAction<PageName>>;
};

export default function App() {
  const [currentPage, setPage] = useState<PageName>("start")
  const [fontsLoaded] = useFonts({Montserrat_600SemiBold});
  const Page = pages[currentPage];
  return <Page setPage={setPage}/>;
}