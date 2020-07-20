import React from 'react'
import { Avatar, Grid } from '@material-ui/core'
import { Tag } from './components'
import { DefaultTitle, ErrorText, InfoText } from '../../..'
import * as Resources from '../../../../Resources'
import '../../../../helpers/StringHelper'

const Team = ({ team, ...props }) => {
    const players = team.collaborators.length
    const managerPhoto = team.manager && team.manager.photo ? team.manager.photo : '/assets/img/user/avatar.svg'

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item>
                    <Avatar src={managerPhoto} />
                </Grid>
                <Grid item xs container>
                    <Grid item xs zeroMinWidth>
                        <DefaultTitle noWrap>{team.name}</DefaultTitle>
                    </Grid>
                    <Grid item>
                        <Tag color={team.color.hex}>{Resources.TEAM_COLLABORATORS_TEXT.format(players)}</Tag>
                    </Grid>
                    <Grid item xs={12} zeroMinWidth>
                        { team.manager && <InfoText noWrap>{Resources.TEAM_MANAGER_TEXT.format(team.manager.firstname, team.manager.lastname)}</InfoText> }
                        { !team.manager && <ErrorText noWrap>{Resources.TEAM_NO_MANAGER_TEXT}</ErrorText> }
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Team
