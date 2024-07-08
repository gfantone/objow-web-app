import React, { createContext } from 'react';

const Context = createContext();

const ThemeWrapper = ({
  primaryColor,
  secondaryColor,
  backgroundColor,
  errorColor,
  successColor,
  children,
}) => {
  return (
    <Context.Provider
      value={{
        primaryColor,
        secondaryColor,
        backgroundColor,
        errorColor,
        successColor,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default { ThemeWrapper, Context };
