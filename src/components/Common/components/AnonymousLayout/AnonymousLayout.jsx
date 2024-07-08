import React from 'react';
import { Route } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Grid,
  CardMedia,
  isWidthUp,
  withWidth,
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { useClearCache } from 'react-clear-cache';
import { useIntl } from 'react-intl';
import { LoginText } from '../../../../components';
import Background from '../../../../assets/fond.jpg';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Nunito Sans',
  },
  palette: {
    background: {
      default: '#F7F8FC',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          // backgroundImage: `url(${Background})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          backgroundSize: 2000,
        },
      },
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
  loginImage: {
    backgroundSize: 'contain',
    width: '100%',
    height: '100%',
  },
}));

const Layout = ({ component: Component, width, ...rest }) => {
  const intl = useIntl();
  const classes = useStyles();
  const { isLatestVersion, emptyCacheStorage } = useClearCache();
  const loginImageBottom = require('../../../../assets/login_image_bottom.png');
  const loginImageBadges = require('../../../../assets/login_image_badges.png');
  const isDesktop = isWidthUp('md', width);

  if (!isLatestVersion) {
    localStorage.clear();
    emptyCacheStorage();
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Route
        {...rest}
        render={(matchProps) => (
          <Grid container>
            {isDesktop && (
              <Grid
                item
                xs={0}
                md={6}
                container
                justify="space-between"
                direction="column"
              >
                <Grid
                  item
                  style={{
                    textAlign: 'center',
                    padding: '50px 30px 0',
                    display: isDesktop ? '' : 'none',
                  }}
                >
                  <LoginText>
                    {intl.formatMessage({ id: 'login.description_line1' })}
                    <br />
                    {intl.formatMessage({ id: 'login.description_line2' })}
                    <br />
                    {intl.formatMessage({ id: 'login.description_line3' })}
                  </LoginText>
                </Grid>
                <Grid item xs>
                  <CardMedia
                    className={classes.loginImage}
                    image={loginImageBadges}
                  />
                </Grid>
                <Grid item xs>
                  <CardMedia
                    className={classes.loginImage}
                    style={{ backgroundPosition: 'bottom' }}
                    image={loginImageBottom}
                  />
                </Grid>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <div className={classes.root}>
                <CssBaseline />
                <main className={classes.content}>
                  <Container maxWidth="sm">
                    <Component {...matchProps} />
                  </Container>
                </main>
              </div>
            </Grid>
          </Grid>
        )}
      />
    </MuiThemeProvider>
  );
};
export default withWidth()(Layout);
