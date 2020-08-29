import React, { createContext, useState } from 'react';
import LocalizedStrings from 'react-native-localization';
import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import cn from './cn.json';

const DEFAULT_LANGUAGE = 'en';
const languages = { en, cn };

const translations = new LocalizedStrings(languages);

export const LocalizationContext = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => {},
});

export const LocalizationProvider = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

  const setLanguage = (language) => {
    translations.setLanguage(language);
    setAppLanguage(language);
  };

  const initializeAppLanguage = () => {
    // Always setting available device language
    let localeCode = DEFAULT_LANGUAGE;
    const supportedLocaleCodes = translations.getAvailableLanguages();
    const phoneLocaleCodes = RNLocalize.getLocales().map(
      (locale) => locale.languageCode,
    );
    phoneLocaleCodes.some((code) => {
      if (supportedLocaleCodes.includes(code)) {
        localeCode = code;
        return true;
      }
      return false;
    });
    setLanguage(localeCode);
  };

  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
