import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import flatten from 'flat';
import locales from '../../../../locales';
import local from '../../../../data/local/local';

const Context = React.createContext();

const I18nWrapper = (props) => {
  const currentLocale = localStorage.getItem('locale') || 'fr';
  const lang = locales[currentLocale];
  const [locale, setLocale] = useState(currentLocale);
  const [messages, setMessages] = useState(lang);
  const selectLanguage = (value) => {
    const newLocale = value;
    setLocale(value);
    setMessages(locales[newLocale]);
    // if (newLocale === 'en') {
    // }
    // if (newLocale === 'fr'){
    //     setMessages(fr);
    // }
  };
  const abortController = new AbortController();

  return (
    <Context.Provider value={{ locale, selectLanguage, abortController }}>
      <IntlProvider
        locale={locale}
        messages={flatten(messages)}
        timeZone='Europe/Paris'
      >
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default { I18nWrapper, Context };
