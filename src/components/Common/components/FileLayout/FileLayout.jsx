import React from 'react'
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom'
import {MuiThemeProvider, createMuiTheme, makeStyles} from '@material-ui/core/styles'
import {AppBar, CssBaseline, Toolbar, Typography} from "@material-ui/core";
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Nunito Sans'
    },
    palette: {
        background: {
            default: "#ffffff"
        }
    }
});

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

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const useStyles = makeStyles({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    main: {
        display: 'flex',
        justifyContent: 'center'
    },
    componentContainer: {
        width: 'fit-content',
        overflow: 'auto'
    }
});

const FileLayout = ({component: Component, history, ...rest}) => {
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={theme}>
            <Route {...rest} render={matchProps => (
                <div>
                    <CssBaseline />
                    <ElevationScroll {...rest}>
                        <AppBar>
                            <Toolbar>
                                <Typography variant="h6">Scroll to Elevate App Bar</Typography>
                            </Toolbar>
                        </AppBar>
                    </ElevationScroll>
                    <Toolbar />
                    <main className={classes.main}>
                        <div className={classes.componentContainer}>
                            <Component {...matchProps} />
                        </div>
                    </main>
                    <Toolbar />
                    <AppBar position="fixed" color="primary" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6">Scroll to Elevate App Bar</Typography>
                        </Toolbar>
                    </AppBar>
                </div>
            )} />
        </MuiThemeProvider>
    )
};

export default withRouter(FileLayout)
