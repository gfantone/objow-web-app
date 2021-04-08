import React, { useState } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Hidden} from '@material-ui/core'
import {Search as SearchIcon} from "@material-ui/icons";
import {InputBase} from "@material-ui/core";
import * as Resources from "../../../../../../../../Resources";

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
    searchMobile: {
        marginLeft: '-15px',
        position: 'relative',
        borderRadius: 4,
        '&:focus': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
    searchIconMobile: {

        padding: '0px 8px',
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
    },

    inputInputMobile: {
      marginLeft: '-15px',
      paddingLeft: `calc(1em + 32px)`,
      transition: 'width 300ms',
      width: '0',
      '&:focus': {
          width: '20ch',
      }
    }
});

const AppBarSearch = ({onChange, onExpand, search, ...props}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const openMobileSearchBar = () => {
      setExpanded(true);
      onExpand(true);
    }
    const closeMobileSearchBar = () => {
      setExpanded(false);
      onExpand(false);
    }

    return (
      <React.Fragment>
        <Hidden smDown>
          <div className={classes.search} style={{marginRight: 16}}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={search}
              placeholder={Resources.MAIN_LAYOUT_SEARCH_PLACEHOLDER}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={onChange}
              />
          </div>
        </Hidden>
        <Hidden mdUp>
          <div className={ expanded ? classes.search : classes.searchMobile } style={{marginRight: 16, marginLeft: '-16px'}}>
            <div className={classes.searchIconMobile}>
              <SearchIcon />
            </div>
            <InputBase
              value={search}
              placeholder={Resources.MAIN_LAYOUT_SEARCH_PLACEHOLDER}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInputMobile,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={onChange}
              onFocus={ openMobileSearchBar }
              onBlur={ closeMobileSearchBar }
            />
          </div>
        </Hidden>
      </React.Fragment>
    )
};

export default AppBarSearch
