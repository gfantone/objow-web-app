import React, { Component } from 'react';
import lottie from 'lottie-web';
import * as animationData from '../../../../../assets/lottie/stars2.json';

class Stars2Animation extends Component {
  componentDidMount() {
    const animation = lottie.loadAnimation({
      container: document.getElementById('stars2-animation'),
      renderer: 'svg',
      loop: true,
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
        id="stars2-animation"
        style={{ width: 150, height: 100 }}
        ref={(ref) => (this.ref = ref)}
      ></div>
    );
  }
}

export default Stars2Animation;
