import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
  return {
    root: {
      color: '#4cd964',
    },
  };
};

const RankEvolutionUp = (props) => {
  const { classes } = props;
  return <FontAwesomeIcon icon={faCaretUp} className={classes.root} />;
};

export default withStyles(styles)(RankEvolutionUp);
