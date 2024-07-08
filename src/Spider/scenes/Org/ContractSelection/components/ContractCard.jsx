import React from 'react';
import {ArrowRight as ArrowRightIcon} from 'iconsax-react'
import {Button, Card, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import {gradients, neutralColors} from '../../../../themes'


const useStyles = makeStyles({
    root: {
        alignItems: 'flex-start',
        gap: '8px',
    },
    images: {
        alignItems: 'flex-end',
        alignSelf: 'stretch',
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-end',
        paddingTop: '56px',
    },
    logo: {
        alignItems: 'center',
        backgroundColor: neutralColors.neutralWhite,
        borderRadius: '16px 0px 0px 0px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: '64px',
        justifyContent: 'center',
        padding: '10px',
        width: '66px'
    },
    infos: {
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '0px 16px 8px 16px',
    },
    name: {
        width: '100%',
    },
    bottom: {
        alignItems: 'center',
        alignSelf: 'stretch',
        display: 'flex',
        flex: 1,
        gap: '8px',
        justifyContent: 'space-between',
        width: '100%',
    }
});

const ContractCard = ({
                          cover,
                          customer,
                          logo,
                          name,
                          uuid
                      }) => {
    const classes = useStyles();

    const coverBackground = cover ?? gradients.gradientLeftToRight100;

    return (
        <>
            <Card className={`${classes.root} selectable`}>
                <div className={classes.images} style={{background: coverBackground}}>
                    <img src={logo} alt={'Logo'} className={classes.logo}/>
                </div>

                <div className={classes.infos}>
                    <Typography variant={'h3'} component={'h3'} className={`${classes.name} underline-left`}>
                        {name}
                    </Typography>

                    <div className={classes.bottom}>
                        <Typography variant={'subtitle2'}>
                            {customer}
                        </Typography>

                        <Button variant={'contained'} color={'primary'} className={'size-tiny icon'}>
                            <ArrowRightIcon/>
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default ContractCard;
