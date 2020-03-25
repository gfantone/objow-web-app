import React from 'react'
import { Timer } from '..'
import { AccentTag, DarkTag, LightTag, UltraLightTag } from '../../..'
import {getDifferenceWithToday} from '../../../../../../helpers/DateHelper'
import '../../../../../../helpers/NumberHelper'

const TimerTag = ({ date }) => {
    const difference = getDifferenceWithToday(date);
    const text = `J${difference}`;

    return (
        <div>
            { difference === 0 && <AccentTag><Timer date={date.toDate2()} /></AccentTag> }
            { difference < 0 && difference >= -5 && <DarkTag>{text}</DarkTag> }
            { difference < -5 && difference >= -30 && <LightTag>{text}</LightTag> }
            { difference < -30  && <UltraLightTag>{text}</UltraLightTag> }
        </div>
    )
};

export default TimerTag
