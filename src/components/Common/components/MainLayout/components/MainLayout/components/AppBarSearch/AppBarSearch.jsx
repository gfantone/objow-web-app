import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Search as SearchIcon} from "@material-ui/icons";
import {InputBase} from "@material-ui/core";

const useStyles = makeStyles({
    search: {
        position: 'relative',
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.25)'
        },
        marginLeft: 0,
        width: '100%'
    },
    searchIcon: {
        padding: '0px 16px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        paddingLeft: `calc(1em + 32px)`,
        transition: 'width 300ms',
        width: '12ch',
        '&:focus': {
            width: '20ch'
        }
    }
});

const AppBarSearch = ({onChange, search, ...props}) => {
    const classes = useStyles();

    return (
        <div className={classes.search} style={{marginRight: 16}}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                value={search}
                placeholder="Rechercher..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChange}
            />
        </div>
    )
};

export default AppBarSearch
