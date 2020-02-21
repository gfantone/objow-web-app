import React, { Component } from 'react'
import Countdown from 'react-countdown-now'

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return <span>Terminé</span>
    } else {
        return <span>{hours}:{minutes}:{seconds}</span>
    }
}

const Timer = ({ date }) => {
    return (
        <div>
            <Countdown date={date} renderer={renderer} />
        </div>
    )
}

export default Timer