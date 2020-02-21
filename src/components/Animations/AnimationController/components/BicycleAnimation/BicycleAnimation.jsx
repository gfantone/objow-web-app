import React, {Component} from 'react'
import lottie from 'lottie-web'
import * as animationData from '../../../../../assets/lottie/bicycle.json'

class BicycleAnimation extends Component {
    componentDidMount() {
        const animation = lottie.loadAnimation({
            container: document.getElementById('bicycle-animation'),
            renderer: 'svg',
            loop: true,
            autoplay: false,
            animationData: animationData.default,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid meet'
            }
        });
        animation.addEventListener('DOMLoaded', function() {
            animation.play()
        })
    }

    render() {
        return (
            <div id='bicycle-animation' style={{width:150,height:100}} ref={ref => this.ref = ref}></div>
        )
    }
}

export default BicycleAnimation
