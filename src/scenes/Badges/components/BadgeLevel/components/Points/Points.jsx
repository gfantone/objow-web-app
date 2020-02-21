import React from 'react'
import { AccentTag, DarkTag } from '../../../../../../components'

const Points = ({ level, ...props }) => {
    const text = `${level.points} PTS`;
    const hasPoints = level.counter >= level.target;

    return (
        <div>
            { hasPoints && <AccentTag>{text}</AccentTag> }
            { !hasPoints && <DarkTag>{text}</DarkTag> }
        </div>
    )
};

export default Points