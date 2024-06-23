import React from 'react';
import {AppBar as MuiAppBar, Toolbar} from '@material-ui/core';

import LogoImg from '../../../../assets/img/logo.svg'

const AppBar = () => {
    return (
        <>
            <MuiAppBar position={'relative'} elevation={0} className={'fullwidth'}>
                <Toolbar>
                    <img height={'48px'} src={LogoImg} alt={'logo'}/>
                </Toolbar>
            </MuiAppBar>
        </>
    );
}

export default AppBar;
