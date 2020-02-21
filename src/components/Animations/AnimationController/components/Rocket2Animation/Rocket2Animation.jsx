import React, {Component} from 'react'
import lottie from 'lottie-web'
import * as animationData from '../../../../../assets/lottie/rocket2.json'

class Rocket2Animation extends Component {
    componentDidMount() {
        const animation = lottie.loadAnimation({
            container: document.getElementById('rocket2-animation'),
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
            <div id='rocket2-animation' style={{width:150,height:100}} ref={ref => this.ref = ref}></div>
        )
    }
}

export default Rocket2Animation
