import React, {Component} from 'react'
import lottie from 'lottie-web'
import * as animationData from '../../../../../assets/lottie/like2.json'

class Like2Animation extends Component {
    componentDidMount() {
        const animation = lottie.loadAnimation({
            container: document.getElementById('like2-animation'),
            renderer: 'svg',
            loop: false,
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
            <div id='like2-animation' style={{width:150,height:100}} ref={ref => this.ref = ref}></div>
        )
    }
}

export default Like2Animation
