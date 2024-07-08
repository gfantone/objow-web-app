import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Hidden } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { InputBase } from '@material-ui/core';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';

const useStyles = makeStyles({
  wrapper: {
    border: '1px solid #43586C',
    background: '#F6F7FB',
    borderRadius: 35,
    height: 30,
  },
  search: {
    position: 'relative',
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    marginLeft: 0,
    width: '100%',
    maxWidth: '100%',
  },
  searchMobile: {
    marginLeft: '-15px',
    position: 'relative',
    borderRadius: 4,
    '&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    padding: '0px 5px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#43586C',
  },
  searchIconMobile: {
    padding: '0px 8px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingLeft: `calc(1em + 15px)`,
    marginTop: 1,
    color: '#43586C',
    fontWeight: 'bold',
    transition: 'all 300ms',
    fontSize: 14,
    paddingTop: 5,
    width: '15vw',
    maxWidth: 200,
    minWidth: 80,
    '&:focus': {
      width: '30vw',
      maxWidth: 340,
    },
  },

  inputInputMobile: {
    paddingLeft: `calc(1em + 15px)`,
    marginTop: 1,
    color: '#43586C',
    fontWeight: 'bold',
    transition: 'all 300ms',
    fontSize: 14,
    paddingTop: 5,
    width: '21vw',
    minWidth: 80,
    '&:focus': {
      width: '56vw',
    },
    maxWidth: '100%',
  },
  inputInputFullSize: {
    width: '100%',
    '&:focus': {
      width: '100%',
    },
  },
});

const ChallengeSearchBar = ({
  onChange,
  onExpand,
  width,
  inputClass,
  delay,
  placeholder,
  fullSize,
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const [searchTimeout, setSearchTimeout] = useState();

  const onSearch = (e) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const value = e.target.value;
    setSearchTimeout(
      setTimeout(() => onChange(value), delay !== undefined ? delay : 300)
    );
  };

  const mobileScreen = isWidthDown('xs', width);

  return (
    <div className={classes.wrapper}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={
            placeholder ||
            intl.formatMessage({ id: 'challenge.search_placeholder' })
          }
          classes={{
            root: classes.inputRoot,
            input: `${
              mobileScreen ? classes.inputInputMobile : classes.inputInput
            } ${fullSize ? classes.inputInputFullSize : ''} ${inputClass}`,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};

export default withWidth()(ChallengeSearchBar);
