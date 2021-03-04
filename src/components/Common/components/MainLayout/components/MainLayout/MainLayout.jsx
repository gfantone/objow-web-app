import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import {CssBaseline, Hidden} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { faAngleLeft, faBars} from '@fortawesome/free-solid-svg-icons'
import { AppBar, AppBarSearch, Drawer, DrawerContent, MainContainer, HeaderContainer, HeaderContainerLeft, HeaderContainerRight, HeaderTitle, HeaderTitleContainer, Search, SubHeaderContainer, Toolbar, ErrorHandler } from './components'
import { IconButton } from '../../../'
import { useClearCache } from 'react-clear-cache'
import { ErrorBoundary } from 'react-error-boundary';


const drawerWidth = 304;
const DEFAULT_BUTTONS = null;
const DEFAULT_MAX_WIDTH = 'lg';
const DEFAULT_SUB_HEADER = null;
const DEFAULT_TITLE = null;
const DEFAULT_RETURN_ACTIVATION = false;
const DEFAULT_SEARCH = null;
const DEFAULT_SEARCH_ACTIVATION = false;

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Nunito Sans'
    },
    palette: {
        background: {
            default: "#f7f8fc"
        }
    }
});

const useStyles = makeStyles(theme => ({
    header: {
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    },
    drawerPaper: {
        width: drawerWidth
    },
    main: {
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    }
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

const MainLayout = ({component: Component, history, ...rest}) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [returnActivation, setReturnActivation] = React.useState(false);
    const [search, setSearch] = React.useState(DEFAULT_SEARCH);
    const [searchActivation, setSearchActivation] = React.useState(DEFAULT_SEARCH_ACTIVATION);
    const [buttons, setButtons] = React.useState(DEFAULT_BUTTONS);
    const [maxWidth, setMaxWidth] = React.useState(DEFAULT_MAX_WIDTH);
    const [subHeader, setSubHeader] = React.useState(DEFAULT_SUB_HEADER);
    const [title, setTitle] = React.useState(DEFAULT_TITLE);
    const {isLatestVersion} = useClearCache();

    if (!isLatestVersion) {
        localStorage.clear();
        window.location = '/'
    }

    function activateReturn() {
        if (history.length > 1) {
            setReturnActivation(true)
        }
    }

    function activateSearch(initial) {
        setSearch(initial);
        setSearchActivation(true);
    }

    function goBack() {
        history.goBack()
    }

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

    function handleNavigate() {
        setMobileOpen(false)
    }

    function handleSearch(event) {
        setSearch(event.target.value);
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

    return (
        <MuiThemeProvider theme={theme}>
            <Route {...rest} render={matchProps => (
                <div>
                    <CssBaseline />
                    <nav className={classes.nav}>
                        <Hidden lgUp implementation='css'>
                              <Drawer variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} classes={{ paper: classes.drawerPaper }}>
                                <DrawerContent onNavigate={handleNavigate} />
                            </Drawer>
                        </Hidden>
                        <Hidden mdDown implementation='css'>
                            <Drawer variant='permanent' classes={{ paper: classes.drawerPaper }}>
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
                                            <HeaderTitle>{title}</HeaderTitle>
                                        </HeaderTitleContainer>
                                        <HeaderContainerLeft>
                                            <div style={{display: 'flex'}}>
                                                { <Hidden lgUp implementation='css'>
                                                    <IconButton size='small' onClick={handleDrawerToggle} style={{marginRight: 12}}>
                                                        <FontAwesomeIcon icon={faBars} />
                                                    </IconButton>
                                                </Hidden> }
                                                { returnActivation && <IconButton size='small' onClick={goBack}>
                                                    <FontAwesomeIcon icon={faAngleLeft} />
                                                </IconButton> }
                                            </div>
                                        </HeaderContainerLeft>
                                        <HeaderContainerRight>
                                            <div style={{display: 'flex'}}>
                                                {searchActivation && <Hidden smDown>
                                                    <AppBarSearch search={search} onChange={handleSearch} />
                                                </Hidden>}
                                                {buttons}
                                            </div>
                                            </HeaderContainerRight>
                                    </HeaderContainer>
                                    { subHeader && <SubHeaderContainer>
                                        { subHeader }
                                    </SubHeaderContainer> }
                                </Toolbar>
                            </div>
                        </AppBar>
                    </ElevationScroll>
                    <div style={{ minHeight: '100vh', backgroundColor: '#f7f8fc' }}>
                        <div style={{ backgroundColor: '#f7f8fc' }}>
                            <div style={{ visibility: 'hidden' }}>
                                <HeaderContainer>
                                    <HeaderTitleContainer>
                                        <HeaderTitle>{title}</HeaderTitle>
                                    </HeaderTitleContainer>
                                </HeaderContainer>
                                <SubHeaderContainer>
                                    { subHeader }
                                </SubHeaderContainer>
                            </div>
                        </div>
                        <div className={classes.main}>
                            <MainContainer maxWidth={maxWidth}>
                                {searchActivation && <Hidden mdUp>
                                    <Search search={search} onChange={handleSearch} />
                                </Hidden>}
                                <ErrorBoundary fallbackRender={ ({error, resetErrorBoundary}) => (
                                  <ErrorHandler />
                                ) }>

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
                                </ErrorBoundary>

                            </MainContainer>
                        </div>
                    </div>
                </div>
            )} />
        </MuiThemeProvider>
    )
};

export default withRouter(MainLayout)
