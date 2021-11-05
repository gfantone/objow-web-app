import React from 'react'
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {RewardImage} from './components'
import {DefaultText, InfoText} from '../../../../components'
import * as Resources from '../../../../Resources'
import _ from 'lodash'
const styles = {

}

const ChallengeReward = ({reward, ...props}) => {
    const {classes} = props

    return (
        <div>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <RewardImage image={_.get(reward, 'image.path', reward.image)} />
              </Grid>
              <Grid item>
                <DefaultText lowercase>
                  { reward.name }
                </DefaultText>
              </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(ChallengeReward)
