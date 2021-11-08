import React from 'react'
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {RewardImage} from './components'
import {DefaultText, InfoText} from '../../../../components'
import * as Resources from '../../../../Resources'
import _ from 'lodash'
const styles = {
  icon: {
      width: 39,
      height: 39
  },
  imageContainer: {
      width: '100%',
      position: 'relative'
  },
  name: {
      overflow: "hidden",
      position: "relative",
      lineHeight: "1.5em",
      maxHeight: "3em",
      textAlign: "left",
      "&&:before": {
          content: '"..."',
          position: "absolute",
          right: 0,
          bottom: 1,
          paddingLeft: 2,
          background: "white"
      },
      "&&:after": {
          content: '""',
          position: "absolute",
          right: 0,
          width: "1em",
          height: "1em",
          marginTop: "0.2em",
          background: "white"
      }
  },
  timerContainer: {
      position: 'absolute',
      right: 0,
      top: 0
  }
}

const ChallengeReward = ({reward, ...props}) => {
    const {classes} = props

    return (
        <div>
          <Grid container spacing={2}>
              <Grid item xs={12}>

                  <div className={classes.imageContainer}>
                      <RewardImage image={_.get(reward, 'image.path', reward.image)} />
                  </div>

              </Grid>
              <Grid item xs={12}>
                  <Grid container spacing={2}>

                      <Grid item xs>

                          <DefaultText className={classes.name} style={{width: '100%'}}>{reward.name}</DefaultText>

                      </Grid>

                  </Grid>
              </Grid>
          </Grid>
            
        </div>
    )
}

export default withStyles(styles)(ChallengeReward)
