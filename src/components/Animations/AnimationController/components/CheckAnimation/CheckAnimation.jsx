import React, { Component } from 'react';
import lottie from 'lottie-web';
import * as animationData from '../../../../../assets/lottie/check.json';

class CheckAnimation extends Component {
  componentDidMount() {
    const animation = lottie.loadAnimation({
      container: document.getElementById('check-animation'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: animationData.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
    });
    animation.addEventListener('DOMLoaded', function () {
      animation.play();
    });
  }

  render() {
    return (
      <div
        id="check-animation"
        style={{ width: 150, height: 100 }}
        ref={(ref) => (this.ref = ref)}
      ></div>
    );
  }
}

export default CheckAnimation;
