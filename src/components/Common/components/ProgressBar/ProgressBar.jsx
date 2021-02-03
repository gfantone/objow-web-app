import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    colorPrimary: {
        backgroundColor: '#D8D8D8'
    },
    barColorPrimary: {
        backgroundColor: '#00E58D'
    }
}

const ProgressBar = ({ value, ...props }) => {
    const { classes, animate } = props
    const displayValue = value <= 100 ? value : 100
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === displayValue) {
            return displayValue;
          }
          const diff = displayValue/5;
          return Math.min(oldProgress + diff, displayValue);
        });
      }, 150);

      return () => {
        clearInterval(timer);
      };
    }, []);

    const componentValue = animate ? progress : displayValue;

    return <LinearProgress variant='determinate' value={componentValue} classes={{
        colorPrimary: classes.colorPrimary,
        barColorPrimary: classes.barColorPrimary
    }} />
}

export default withStyles(styles)(ProgressBar)
