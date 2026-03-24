import { useState } from 'react';
import { EditorPage } from './pages/EditorPage';
import { Language } from './i18n';
import './App.css';

function App() {
  const [language, setLanguage] = useState<Language>('ja');

  return <EditorPage language={language} onLanguageChange={setLanguage} />;
}

export default App;
