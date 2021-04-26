import React from 'react'
import {Avatar, Tooltip} from '@material-ui/core'
import { getColorById } from '../../../../helpers/ColorsHelper'
import _ from 'lodash'
import chroma from 'chroma-js'

// Background color based on id or set in props
// Color based on background color or set in props
// FallbackName is displayed if no avatar given in src
const CustomAvatar = (props) => {
  const { src, entityId, fallbackName, backgroundColor, color, borderColor, tooltip} = props

  const initials = fullname => fullname && String(fullname).split(' ').map(name => name.slice(0,1).toUpperCase()).join('')
  const customBackgroundColor = backgroundColor ? backgroundColor : getColorById(entityId)
  const customColor = color ? color : (customBackgroundColor ? chroma(customBackgroundColor).darken(1.5) : '')
  const avatar = (
    <Avatar {...props} style={{
      fontSize: 16,
      backgroundColor: customBackgroundColor,
      color: customColor,
      borderColor: borderColor
    }}>
      { fallbackName ? initials(fallbackName) : null}
    </Avatar>
  )
  return(
    <React.Fragment>
      { tooltip && (
        <Tooltip title={tooltip}>
          { avatar }
        </Tooltip>
      )}
      {
        !tooltip && avatar
      }
    </React.Fragment>
  )
}

export default CustomAvatar;
