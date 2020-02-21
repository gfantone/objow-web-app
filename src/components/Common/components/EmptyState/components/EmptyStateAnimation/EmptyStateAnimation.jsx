import React, {Component} from 'react'
import lottie from 'lottie-web'
import * as animationData from '../../../../../../assets/lottie/search.json'

class EmptyStateAnimation extends Component {
    componentDidMount() {
        lottie.loadAnimation({
            container: document.getElementById('empty-state-animation'),
            renderer: 'svg',
            animationData: animationData,
            loop: true
        })
    }

    render() {
        return (
            <div id='empty-state-animation' ref={ref => this.ref = ref}></div>
        )
    }
}

export default EmptyStateAnimation