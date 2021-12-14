import React  from 'react'
import {Route} from 'react-router-dom'
import {Container, CssBaseline} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {makeStyles} from '@material-ui/core/styles'
import { useClearCache } from 'react-clear-cache'
import Background from "../../../../assets/fond.jpg"

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Nunito Sans'
    },
    palette: {
        background: {
            default: "#2B2E45"
        }
    },
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                    backgroundImage: `url(${Background})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
                    backgroundSize: 2000
                }
            }
        }
    }
})

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 32
    }
}))

const Layout = ({component: Component, ...rest}) => {
    const classes = useStyles()
    const { isLatestVersion, emptyCacheStorage } = useClearCache()
    console.log(isLatestVersion);
    if (!isLatestVersion) {
        emptyCacheStorage()
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Route {...rest} render={matchProps => (
                <div className={classes.root}>
                    <CssBaseline />
                    <main className={classes.content}>
                        <Container maxWidth='xs'>
                            <Component {...matchProps} />
                        </Container>
                    </main>
                </div>
            )} />
        </MuiThemeProvider>
    )
}
export default Layout
