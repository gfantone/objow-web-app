import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    color: '#E50000',
  },
};

const RankEvolutionDown = (props) => {
  const { classes } = props;
  return <FontAwesomeIcon icon={faCaretDown} className={classes.root} />;
};

export default withStyles(styles)(RankEvolutionDown);
