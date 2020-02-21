import React, {Component} from 'react'
import lottie from 'lottie-web'
import * as animationData from '../../../../../../../../../../assets/lottie/rocket.json'

class RocketAnimation extends Component {
    componentDidMount() {
        const animation = lottie.loadAnimation({
            container: document.getElementById('rocket-animation'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: animationData
        })
        animation.addEventListener('DOMLoaded', function() {
            animation.setSpeed(0.5)
            animation.playSegments([0,56], true)
        })
    }

    render() {
        return (
            <div id='rocket-animation' ref={ref => this.ref = ref}></div>
        )
    }
}

export default RocketAnimation