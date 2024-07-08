import React, { Component } from 'react';
import lottie from 'lottie-web';
import { withStyles } from '@material-ui/core/styles';
import * as animationData from '../../../../../assets/lottie/rocket.json';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '100%',
  },
  container: {
    width: 150,
    height: 100,
    position: 'relative',
  },
  animation: {
    height: 150,
    width: 150,
    position: 'absolute',
    bottom: 0,
  },
};

class RocketAnimation extends Component {
  componentDidMount() {
    const animation = lottie.loadAnimation({
      container: document.getElementById('rocket-animation'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: animationData,
    });
    animation.addEventListener('DOMLoaded', function () {
      animation.setSpeed(0.5);
      animation.playSegments([0, 56], true);
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.animation}>
            <div id="rocket-animation" ref={(ref) => (this.ref = ref)}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RocketAnimation);
