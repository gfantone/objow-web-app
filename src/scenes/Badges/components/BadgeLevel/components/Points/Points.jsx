import React from 'react'
import { AccentTag, DarkTag } from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import '../../../../../../helpers/StringHelper'

const Points = ({ level, ...props }) => {
    const text = Resources.BADGE_LEVEL_POINT_TEXT.format(level.points)
    const hasPoints = level.counter >= level.target

    return (
        <div>
            { hasPoints && <AccentTag>{text}</AccentTag> }
            { !hasPoints && <DarkTag>{text}</DarkTag> }
        </div>
    )
};

export default Points
