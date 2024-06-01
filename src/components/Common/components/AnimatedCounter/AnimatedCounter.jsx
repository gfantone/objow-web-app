import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

const AnimatedCounter = ({ badge, ...props }) => {
  const { counter: max, timer, resource } = props;
  const [counter, setCounter] = useState(0);
  const timing = timer || 750;
  const step = Math.ceil(max / (timing / 10));

  React.useEffect(() => {
    const timer = setInterval(
      () => {
        setCounter((oldProgress) => {
          if (oldProgress === max) {
            return max;
          }

          return parseInt(Math.min(oldProgress + step, max));
        });
      },
      Math.ceil(timing / (max / step), 10),
    );

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <span>{resource ? resource.format(counter) : counter}</span>;
};

export default withStyles(styles)(AnimatedCounter);
