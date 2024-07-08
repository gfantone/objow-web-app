import React from 'react';
import { Route } from 'react-router-dom';
import { AppBar, Container, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { useClearCache } from 'react-clear-cache';
import Background from '../../../../assets/img/system/login/wave.png';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Nunito Sans',
  },
  palette: {
    background: {
      default: '#FFFFFF',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 32,
  },
  appBar: {
    backgroundColor: 'transparent',
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'top',
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto 38px',
    boxShadow: 'none',
    height: 38,
  },
}));

const Layout = ({ component: Component, ...rest }) => {
  const classes = useStyles();
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  if (!isLatestVersion) {
    localStorage.clear();
    emptyCacheStorage();
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Route
        {...rest}
        render={(matchProps) => (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.appBar} />
            <main className={classes.content}>
              <Container maxWidth="xs">
                <Component {...matchProps} />
              </Container>
            </main>
          </div>
        )}
      />
    </MuiThemeProvider>
  );
};
export default Layout;
