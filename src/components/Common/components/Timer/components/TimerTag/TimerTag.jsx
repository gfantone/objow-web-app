import React from 'react'
import { Timer } from '..'
import { AccentTag, DarkTag, LightTag, UltraLightTag } from '../../..'
import '../../../../../../helpers/NumberHelper'

const TimerTag = ({ date }) => {
    const day = 24 * 60 * 60 * 1000;
    const now = new Date();
    const target = new Date(date * 1000);
    now.setHours(0, 0, 0, 0);
    target.setMinutes(target.getMinutes() + target.getTimezoneOffset());
    target.setHours(0, 0, 0, 0);
    const difference = Math.round((now.getTime() - target.getTime()) / day);
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