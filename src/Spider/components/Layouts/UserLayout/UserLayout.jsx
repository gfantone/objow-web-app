import React from 'react';
import {useClearCache} from 'react-clear-cache';
import {ErrorBoundary} from 'react-error-boundary';
import {useHistory} from 'react-router-dom'
import {CssBaseline, ThemeProvider} from '@material-ui/core';

import {cssBaselineStyles} from './styles';
import {AppBar, Footer} from './components';
import {ErrorFallback} from "../../../scenes";
import {useTheme} from "../../../../distributors";

const UserLayout = ({component: Component}) => {
    const {emptyCacheStorage} = useClearCache();
    const theme = useTheme(cssBaselineStyles);
    const history = useHistory();

    const handleError = (error, info) => {
        console.error("Error caught by ErrorBoundary: ", error, info);
    }

    const handleReset = async () => {
        await emptyCacheStorage();
        history.push('/');
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <AppBar/>

                <div className="ft-wrapper">
                    <main>
                        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset} onError={handleError}>
                            <Component/>
                        </ErrorBoundary>
                    </main>
                </div>

                <Footer/>
            </ThemeProvider>
        </>
    );
}

export default UserLayout;
