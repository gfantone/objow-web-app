import React from 'react';
import {useClearCache} from 'react-clear-cache';
import {ErrorBoundary} from 'react-error-boundary';
import {useHistory} from 'react-router-dom'
import {CssBaseline, ThemeProvider} from '@material-ui/core';

import {cssBaselineStyles} from './styles';
<<<<<<< HEAD
import {AppBar, Footer} from './components';
import {ErrorFallback} from "../../../scenes";
import {useTheme} from "../../../../distributors";
=======
import {AppBar, Footer, SideBar} from './components';
import {ErrorFallback} from '../../../scenes';
import {useTheme} from '../../../../distributors';
>>>>>>> dev

const UserLayout = ({component: Component}) => {
    const {emptyCacheStorage} = useClearCache();
    const theme = useTheme(cssBaselineStyles);
    const history = useHistory();

    const handleError = (error, info) => {
<<<<<<< HEAD
        console.error("Error caught by ErrorBoundary: ", error, info);
    }
=======
        console.error('Error caught by ErrorBoundary: ', error, info);
    };
>>>>>>> dev

    const handleReset = async () => {
        await emptyCacheStorage();
        history.push('/');
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
<<<<<<< HEAD

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
=======
                <div className='sidebar-root'>
                    <AppBar/>
                    <div className='sidebar-content'>
                        <SideBar/>

                        <div className='ft-wrapper'>
                            <main style={{ justifyContent: 'start' }}>
                                <ErrorBoundary
                                    FallbackComponent={ErrorFallback}
                                    onReset={handleReset}
                                    onError={handleError}
                                >
                                    <Component/>
                                </ErrorBoundary>
                            </main>
                            <Footer/>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
};
>>>>>>> dev

export default UserLayout;
