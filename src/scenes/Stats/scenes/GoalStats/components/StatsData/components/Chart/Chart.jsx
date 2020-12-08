import React from 'react'
import {linearGradientDef} from '@nivo/core'
import {ResponsiveLine} from '@nivo/line'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFireAlt, faUser, faUsers} from '@fortawesome/free-solid-svg-icons'
import {DefaultText, InfoText} from '../../../../../../../../components'
import * as Resources from '../../../../../../../../Resources'

const Chart = ({data, end, start, ...props}) => {
    var max = 100
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].data.length; j++) {
            if (data[i].data[j].y > 100) {
                max = 'auto'
                break
            }
        }
    }

    return (
        <ResponsiveLine
            axisBottom={{
                format: '%d/%m',
                legend: Resources.CHART_X_LEGEND,
                legendOffset: 36,
                legendPosition: 'middle',
                tickValues: 'every 1 month'
            }}
            axisLeft={{
                legend: Resources.CHART_Y_LEGEND,
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={{datum: 'color'}}
            curve='monotoneX'
            data={data}
            defs={[
                linearGradientDef('gradientA', [
                    { offset: 0, color: 'inherit' },
                    { offset: 100, color: 'inherit', opacity: 0 },
                ]),
            ]}
            enableArea={true}
            enableSlices='x'
            fill={[{ match: '*', id: 'gradientA' }]}
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            markers={[
                {
                    axis: 'y',
                    value: 100,
                    lineStyle: { stroke: '#555555', strokeWidth: 2 },
                }
            ]}
            useMesh={true}
            sliceTooltip={({ slice }) => {
                return (
                    <div
                        style={{
                            background: '#ffffff',
                            border: '1px solid #ccc',
                            padding: '9px 12px'
                        }}
                    >
                        {slice.points.map(point => {
                            const typeStyle = point.data.typeCode === 'T' ? {color: point.data.color} : null

                            return (
                                <div>
                                    <DefaultText>{Resources.CHART_TARGET_TEXT.format(point.data.target)}</DefaultText>
                                    <DefaultText>{Resources.CHART_COUNTER_TEXT.format(point.data.counter)}</DefaultText>
                                    <DefaultText>
                                        <FontAwesomeIcon icon={faFireAlt} /> {Resources.CHART_POINTS_TEXT.format(point.data.points)} <InfoText component='span'>{Resources.CHART_MAX_POINTS_TEXT.format(point.data.maxPoints)}</InfoText>
                                    </DefaultText>
                                    <DefaultText style={typeStyle}>
                                        <FontAwesomeIcon icon={point.data.typeCode === 'C' ? faUser : faUsers}/> {point.data.typeCode === 'C' ? Resources.CHART_COLLABORATOR_TYPE_TEXT : Resources.CHART_TEAM_TYPE_TEXT}
                                    </DefaultText>
                                </div>
                            )
                        })}
                    </div>
                )
            }}
            xFormat='time:%Y-%m-%d'
            xScale={{
                format: '%Y-%m-%d',
                max: end,
                min: start,
                precision: 'day',
                type: 'time',
                useUTC: false,
            }}
            yScale={{
                max: max,
                min: '0',
                type: 'linear',
            }}
        />
    )
}

export default Chart
