import React from 'react';
import {useIntl} from 'react-intl';
import {Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";

import {NeedHelp} from './components'

import WarningImg from '../../assets/img/warning.png'

const useStyles = makeStyles((theme) => ({
    contractInaccessible: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
}));

const ContractInaccessible = () => {
    const intl = useIntl();
    const classes = useStyles();

    return (
        <>
            <div className={'ft-content'}>
                <img src={WarningImg} alt={'warning'}/>

                <div className={classes.contractInaccessible}>
                    <Typography variant="h1" component="h1" align={'center'}>
                        {intl.formatMessage({id: 'spider.errors.contract_inaccessible.title'})}
                    </Typography>

                    <Typography align={'center'}>
                        {intl.formatMessage({id: 'spider.errors.contract_inaccessible.message'})}
                    </Typography>

                    <NeedHelp/>
                </div>
            </div>
        </>
    );
}

export default ContractInaccessible;
