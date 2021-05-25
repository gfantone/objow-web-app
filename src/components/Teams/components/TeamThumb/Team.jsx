import React from 'react'
import { Grid, Card } from '@material-ui/core'
import { Tag } from './components'
import { DefaultTitle, ErrorText, InfoText, Avatar } from '../../..'
import * as Resources from '../../../../Resources'
import '../../../../helpers/StringHelper'
import _ from 'lodash'

const Team = ({ team, ...props }) => {
    const players = team.collaborators.length
    const managerPhoto = team.manager && team.manager.photo ? team.manager.photo : '/assets/img/user/avatar.svg'

    return (
        <div>
          <Card>
            <div style={{margin: 15}}>
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar
                    src={managerPhoto}
                    entityId={ _.get(team, 'manager.id') }
                    fallbackName={ _.get(team, 'manager.fullname') }
                    tooltip={ _.get(team, 'manager.fullname') }
                    />
                </Grid>
                <Grid item xs container direction='column' alignItems="flex-start">
                  <Grid item xs zeroMinWidth>
                    <DefaultTitle noWrap>{team.name}</DefaultTitle>
                  </Grid>
                  <Grid item>
                    <Tag color={team.color.hex}>{Resources.TEAM_COLLABORATORS_TEXT.format(players)}</Tag>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Card>
        </div>
    )
}

export default Team
