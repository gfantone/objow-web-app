import React, { Component } from 'react';
import lottie from 'lottie-web';
import * as animationData from '../../../../../../assets/lottie/search.json';
import { uuidv4 } from '../../../../../../helpers/UUIDHelper';

class EmptyStateAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
    };
    this.id = `empty-state-animation-${uuidv4()}`;
  }

  componentDidMount() {
    if (!this.state.initialized) {
      this.setState({ initialized: true }, () => {
        lottie.loadAnimation({
          container: document.getElementById(this.id),
          renderer: 'svg',
          animationData: animationData.default,
          loop: true,
        });
      });
    }
  }

  render() {
    return <div id={this.id} ref={(ref) => (this.ref = ref)}></div>;
  }
}

export default EmptyStateAnimation;
