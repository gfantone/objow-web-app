import React, { Component } from 'react';
import lottie from 'lottie-web';
import * as animationData from '../../../../../assets/lottie/share.json';

class ShareAnimation extends Component {
  componentDidMount() {
    const animation = lottie.loadAnimation({
      container: document.getElementById('share-animation'),
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
        id="share-animation"
        style={{ width: 150, height: 100 }}
        ref={(ref) => (this.ref = ref)}
      ></div>
    );
  }
}

export default ShareAnimation;
