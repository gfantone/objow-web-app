import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
  return {
    root: {
      height: 32,
      color: '#FFFFFF',
      backgroundColor: theme.palette.primary.main,
      borderRadius: 16,
      paddingLeft: 32,
      paddingTop: 0,
      paddingRight: 32,
      paddingBottom: 0,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    textPrimary: {
      color: '#ffffff',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
    },
    textSecondary: {
      color: '#555555',
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
    },
  };
};

export default withStyles(styles)(Button);
