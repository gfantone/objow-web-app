import React, { useEffect, useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CssBaseline, Grid, Hidden, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { faAngleLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {
  AppBar,
  AppBarSearch,
  Drawer,
  DrawerContent,
  MainContainer,
  HeaderContainer,
  HeaderContainerLeft,
  HeaderContainerRight,
  HeaderTitle,
  HeaderTitleContainer,
  SubHeaderContainer,
  Toolbar,
  ErrorHandler,
  UpdateAppModal,
  JtiEvents,
  OneSignalInit,
  ScrollToTop,
} from './components';
import { ThemeWrapper } from '../../../../../';
import * as menuNotificationListActions from '../../../../../../services/MenuNotifications/MenuNotificationList/actions';
import * as configListActions from '../../../../../../services/Configs/ConfigList/actions';
import { IconButton } from '../../../';
import { useClearCache } from 'react-clear-cache';
import { ErrorBoundary } from 'react-error-boundary';
import PageVisibility from 'react-page-visibility';
import _, { update } from 'lodash';
import local from '../../../../../../data/local/local';

const drawerWidth = 304;
const DEFAULT_BUTTONS = null;
const DEFAULT_MAX_WIDTH = 'lg';
const DEFAULT_SUB_HEADER = null;
const DEFAULT_TITLE = null;
const DEFAULT_RETURN_ACTIVATION = false;
const DEFAULT_SEARCH = null;
const DEFAULT_SEARCH_ACTIVATION = false;

const getTheme = ({
  primaryColor,
  secondaryColor,
  backgroundColor,
  fontFamilyPrimary,
}) => {
  return createTheme({
    typography: {
      fontFamily: fontFamilyPrimary || 'Nunito Sans',
    },
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: backgroundColor,
      },
      error: {
        main: '#E50000',
      },
      success: {
        main: '#00E58D',
      },
    },
  });
};
const useStyles = makeStyles((theme) => ({
  header: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  main: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    '& a': {
      color: 'rgb(15,111,222)',
      '&:active, &:hover': {
        color: 'rgb(15,111,222)',
      },
    },
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const MainLayout = ({ component: Component, history, ...rest }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [returnActivation, setReturnActivation] = React.useState(false);
  const [search, setSearch] = React.useState(DEFAULT_SEARCH);
  const [searchActivation, setSearchActivation] = React.useState(
    DEFAULT_SEARCH_ACTIVATION
  );
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  const [buttons, setButtons] = React.useState(DEFAULT_BUTTONS);
  const [maxWidth, setMaxWidth] = React.useState(DEFAULT_MAX_WIDTH);
  const [subHeader, setSubHeader] = React.useState(DEFAULT_SUB_HEADER);
  const [title, setTitle] = React.useState(DEFAULT_TITLE);

  const { isLatestVersion, emptyCacheStorage } = useClearCache();
  const [refreshApp, setRefreshApp] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);

  const [primaryColor, setPrimaryColor] = React.useState();
  const [secondaryColor, setSecondaryColor] = React.useState();
  const [backgroundColor, setBackgroundColor] = React.useState();
  const [theme, setTheme] = React.useState();
  const { configs, hasError } = rest.configList;

  useEffect(() => {
    if (window.setAppVersion) {
      window.setAppVersion();
      toast.success(localStorage.getItem('objow_app_version'));
    }
    rest.configListActions.getPermanentConfigList();
    // set default theme while configs are loading
    setTheme(
      getTheme({
        primaryColor: '#000',
        secondaryColor: '#000',
        backgroundColor: '#F7F8FC',
      })
    );
  }, []);
  useEffect(() => {
    if (configs && !initialized) {
      const primaryColor = _.get(
        configs.filter((config) => config.code === 'CCPH')[0],
        'value',
        '#06e094'
      );

      const secondaryColor = _.get(
        configs.filter((config) => config.code === 'CCSH')[0],
        'value',
        '#05192c'
      );
      const backgroundColor = _.get(
        configs.filter((config) => config.code === 'CCBH')[0],
        'value',
        '#F7F8FC'
      );
      const fontFamilyPrimary = _.get(
        configs.filter((config) => config.code === 'CFF')[0],
        'value',
        'Nunito Sans'
      );
      setTheme(
        getTheme({
          primaryColor,
          secondaryColor,
          backgroundColor,
          fontFamilyPrimary,
        })
      );
      setPrimaryColor(primaryColor);
      setSecondaryColor(secondaryColor);
      setBackgroundColor(backgroundColor);
      setInitialized(true);
    }
  }, [configs]);

  if (localStorage.getItem('UPDATE_MENU_NOTIFICATIONS')) {
    localStorage.removeItem('UPDATE_MENU_NOTIFICATIONS');
    rest.menuNotificationListActions.getMenuNotificationList();
  }

  if (localStorage.getItem('CHECK_NEW_VERSION')) {
    localStorage.removeItem('CHECK_NEW_VERSION');
    if (!isLatestVersion) {
      // TODO : uncomment setRefreshApp to activate update modale and remove emptyCacheStorage line
      emptyCacheStorage();

      // setRefreshApp(true)

      // emptyCacheStorage()
      // const { store, persistor } = configureStore();
      // persistor.purge().then(() => {
      //   // localStorage.clear();
      //   // emptyCacheStorage()
      //   local.removeAccessToken()
      //   local.removeRefreshToken()
      //   window.location = '/'
      // })
      // localStorage.clear();

      // local.removeAccessToken()
      // local.removeRefreshToken()
      // local.removeStore()
      // window.location = '/'
    }
  }

  function activateReturn() {
    if (history.length > 1) {
      setReturnActivation(true);
    }
  }

  function activateSearch(initial) {
    setSearch(initial);
    setSearchActivation(true);
  }

  function goBack() {
    history.goBack();
  }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function handleNavigate() {
    setMobileOpen(false);
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleSearchExpand(isOpen) {
    setSearchExpanded(isOpen);
  }

  function clear() {
    setButtons(DEFAULT_BUTTONS);
    setMaxWidth(DEFAULT_MAX_WIDTH);
    setReturnActivation();
    setSubHeader(DEFAULT_SUB_HEADER);
    setTitle(DEFAULT_TITLE);
    setReturnActivation(DEFAULT_RETURN_ACTIVATION);
    setSearch(DEFAULT_SEARCH);
    setSearchActivation(DEFAULT_SEARCH_ACTIVATION);
  }

  // Called when change tab
  const handleVisibilityChange = (isVisible) => {
    if (isVisible) {
      // window.location.reload()
    }
  };

  return (
    <>
      {!initialized && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: '-15px',
            marginTop: '-15px',
          }}
        >
          <CircularProgress style={{ color: '#333' }} />
        </div>
      )}

      <ThemeWrapper.ThemeWrapper
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        backgroundColor={backgroundColor}
        errorColor='#E50000'
        successColor='#00E58D'
      >
        <MuiThemeProvider theme={theme}>
          <Route
            {...rest}
            render={(matchProps) => (
              <div style={{ position: 'relative' }}>
                <CssBaseline />

                {initialized && (
                  <>
                    <nav className={classes.nav}>
                      <Hidden lgUp implementation='css'>
                        <Drawer
                          variant='temporary'
                          open={mobileOpen}
                          onClose={handleDrawerToggle}
                          classes={{ paper: classes.drawerPaper }}
                        >
                          <DrawerContent onNavigate={handleNavigate} />
                        </Drawer>
                      </Hidden>
                      <Hidden mdDown implementation='css'>
                        <Drawer
                          variant='permanent'
                          classes={{ paper: classes.drawerPaper }}
                        >
                          <DrawerContent onNavigate={handleNavigate} />
                        </Drawer>
                      </Hidden>
                    </nav>
                    <ElevationScroll {...rest}>
                      <AppBar>
                        <div className={classes.main}>
                          <Toolbar>
                            <HeaderContainer>
                              <HeaderTitleContainer>
                                <HeaderTitle
                                  secondaryColor={secondaryColor}
                                  style={{
                                    visibility: searchExpanded
                                      ? 'hidden'
                                      : 'visible',
                                  }}
                                >
                                  {title}
                                </HeaderTitle>
                              </HeaderTitleContainer>
                              <HeaderContainerLeft>
                                <div style={{ display: 'flex' }}>
                                  {
                                    <Hidden lgUp implementation='css'>
                                      <IconButton
                                        size='small'
                                        onClick={handleDrawerToggle}
                                        style={{ marginRight: 12 }}
                                      >
                                        <FontAwesomeIcon icon={faBars} />
                                      </IconButton>
                                    </Hidden>
                                  }
                                  {returnActivation && (
                                    <IconButton size='small' onClick={goBack}>
                                      <FontAwesomeIcon icon={faAngleLeft} />
                                    </IconButton>
                                  )}
                                </div>
                              </HeaderContainerLeft>
                              <HeaderContainerRight>
                                <div style={{ display: 'flex' }}>
                                  {searchActivation && (
                                    <AppBarSearch
                                      search={search}
                                      onChange={handleSearch}
                                      onExpand={setSearchExpanded}
                                    />
                                  )}
                                  {buttons}
                                </div>
                              </HeaderContainerRight>
                            </HeaderContainer>
                            {subHeader && (
                              <SubHeaderContainer>
                                {subHeader}
                              </SubHeaderContainer>
                            )}
                          </Toolbar>
                        </div>
                      </AppBar>
                    </ElevationScroll>
                    <div
                      style={{
                        minHeight: '100vh',
                        backgroundColor: backgroundColor,
                      }}
                    >
                      <div style={{ backgroundColor: backgroundColor }}>
                        <div style={{ visibility: 'hidden' }}>
                          <HeaderContainer>
                            <HeaderTitleContainer>
                              <HeaderTitle>{title}</HeaderTitle>
                            </HeaderTitleContainer>
                          </HeaderContainer>
                          <SubHeaderContainer>{subHeader}</SubHeaderContainer>
                        </div>
                      </div>
                      <div className={classes.main}>
                        {refreshApp && <UpdateAppModal />}
                        <MainContainer maxWidth={maxWidth}>
                          <PageVisibility onChange={handleVisibilityChange}>
                            <ErrorBoundary
                              fallbackRender={({
                                error,
                                resetErrorBoundary,
                              }) => {
                                console.log(error);
                                return <ErrorHandler />;
                              }}
                            >
                              <React.Fragment>
                                <OneSignalInit />
                                <JtiEvents goBack={goBack}>
                                  <Component
                                    handleButtons={setButtons}
                                    handleMaxWidth={setMaxWidth}
                                    activateReturn={activateReturn}
                                    activateSearch={activateSearch}
                                    handleSubHeader={setSubHeader}
                                    handleTitle={setTitle}
                                    search={search}
                                    clear={clear}
                                    {...matchProps}
                                  />
                                </JtiEvents>
                              </React.Fragment>
                            </ErrorBoundary>
                          </PageVisibility>
                        </MainContainer>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          />
        </MuiThemeProvider>
      </ThemeWrapper.ThemeWrapper>
    </>
  );
};

const mapStateToProps = ({ configList }) => ({
  configList,
});

const mapDispatchToProps = (dispatch) => ({
  menuNotificationListActions: bindActionCreators(
    menuNotificationListActions,
    dispatch
  ),
  configListActions: bindActionCreators(configListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainLayout));
