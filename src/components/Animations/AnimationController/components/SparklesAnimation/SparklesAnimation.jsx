import React, {Component} from 'react'
import lottie from 'lottie-web'
import * as animationData from '../../../../../assets/lottie/sparkles.json'

class SparklesAnimation extends Component {
    componentDidMount() {
        const animation = lottie.loadAnimation({
            container: document.getElementById('sparkles-animation'),
            renderer: 'svg',
            loop: true,
            autoplay: false,
            animationData: animationData,
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
            <div id='sparkles-animation' style={{width:150,height:100}} ref={ref => this.ref = ref}></div>
        )
    }
}

export default SparklesAnimation
