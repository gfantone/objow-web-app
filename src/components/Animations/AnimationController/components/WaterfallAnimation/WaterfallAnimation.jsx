import React, {Component} from 'react'
import lottie from 'lottie-web'
import * as animationData from '../../../../../assets/lottie/waterfall.json'

class WaterfallAnimation extends Component {
    componentDidMount() {
        const animation = lottie.loadAnimation({
            container: document.getElementById('waterfall-animation'),
            renderer: 'svg',
            loop: false,
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
            <div id='waterfall-animation' style={{width:150,height:100}} ref={ref => this.ref = ref}></div>
        )
    }
}

export default WaterfallAnimation
