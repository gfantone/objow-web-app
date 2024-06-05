import React from 'react';
import { AppBar, Card, CssBaseline, ThemeProvider } from '@material-ui/core';
import { edenredTheme } from '../../../themes'

import './GuestLayout.css'

const GuestLayout = ({ component: Component }) => {
    return (
        <>
            <ThemeProvider theme={edenredTheme}>
                <CssBaseline />

                <AppBar>
                    Titre
                </AppBar>

                <div className="ft-wrapper">
                    <main>
                        <Component />
                    </main>
                </div>

                <footer>
                    <Card>
                        Espace Kadéos Incentive V1.0.0
                        { /* TODO: dynamiser le nom de l'application et le n° de version */ }
                    </Card>
                </footer>
            </ThemeProvider>
        </>
    );
}

export default GuestLayout;
