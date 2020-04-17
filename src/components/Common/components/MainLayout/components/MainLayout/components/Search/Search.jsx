import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Search as SearchIcon} from "@material-ui/icons";
import {InputBase} from "@material-ui/core";

const useStyles = makeStyles({
    search: {
        position: 'relative',
        borderRadius: 4,
        marginLeft: 0,
        marginBottom: 16,
        width: '100%'
    },
    searchIcon: {
        color: '#999999',
        padding: '0px 16px 0px 0px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        width: '100%',
        color: '#999999'
    },
    inputInput: {
        paddingLeft: `calc(1em + 16px)`,
        width: '100%'
    }
});

const Search = ({onChange, search, ...props}) => {
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

export default Search
