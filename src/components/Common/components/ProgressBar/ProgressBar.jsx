import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      borderRadius: 5,
      height: 5,
    },
    colorPrimary: {
      borderRadius: 5,
      backgroundColor: '#D8D8D8',
    },
    colorPrimaryGradient: {
      borderRadius: 5,
      backgroundColor: '#D8D8D8',
    },
    barColorPrimary: ({ progress }) => {
      return {
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main,
      };
    },
    barColorPrimaryGradient: ({ progress }) => {
      return {
        borderRadius: 5,
        // backgroundImage: `linear-gradient(90deg,hsl(233deg 23% 22%) ${0}%, hsl(160deg 100% 44%) ${(100 / progress * 100) - 60}%)`,
        backgroundImage: `linear-gradient(90deg, #ACE4AE ${
          100 - progress - 40
        }%, ${theme.palette.success.main} ${100 + (100 - progress)}%)`,
      };
    },
  };
});

const ProgressBar = ({ value, gradient, ...props }) => {
  const { animate } = props;
  const displayValue = value <= 100 ? value : 100;
  const [progress, setProgress] = React.useState(0);

  const classes = useStyles({ progress });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === displayValue) {
          return displayValue;
        }
        const diff = displayValue / 5;
        return Math.min(oldProgress + diff, displayValue);
      });
    }, 150);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const componentValue = animate ? progress : displayValue;

  return (
    <LinearProgress
      variant='determinate'
      value={componentValue}
      classes={{
        root: classes.root,
        colorPrimary: gradient
          ? classes.colorPrimaryGradient
          : classes.colorPrimary,
        barColorPrimary: gradient
          ? classes.barColorPrimaryGradient
          : classes.barColorPrimary,
      }}
    />
  );
};

export default ProgressBar;
