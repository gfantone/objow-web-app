import React, { useState } from 'react'
import { Grid, CardMedia } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { DefaultText, BoldTitle, TeamSelector, AdministratorCollaboratorSelector, AppBarSubTitle, MainLayoutComponent } from '../../../../components'
import { Redirect } from 'react-router-dom'

const styles = {
  icon: {
    width: 150,
    height: 150
  },
  link: {
    cursor: 'pointer',
  }
}

const AdminGoalPointModeSelect = ({ onChange, classes, history, ...props }) => {
  const global_icon = require(`../../../../assets/img/system/goalPoints/global.svg`)
  const team_icon = require(`../../../../assets/img/system/goalPoints/team.svg`)
  const individual_icon = require(`../../../../assets/img/system/goalPoints/teamwork-1.svg`)


  const [mode, setMode] = useState()
  const [team, setTeam] = useState()
  const [collaborator, setCollaborator] = useState()

  if(mode === 'global') {
    history.push(`/admin/periods/${ props.match.params.periodId }/goal-levels?type=C`)
  }
  if(team && !collaborator) {
    history.push(`/admin/periods/${ props.match.params.periodId }/goal-levels?type=C&team=${team}`)
  }
  if(collaborator && team) {
    history.push(`/admin/periods/${ props.match.params.periodId }/goal-levels?type=C&collaborator=${ collaborator }&team=${team}`)
  }


  return (
    <React.Fragment>
      { !mode && (
        <div style={{marginTop: '48px'}}>
          <Grid container direction="row" justify="center" spacing={8}>
            <Grid item onClick={ () => setMode('global') } className={ classes.link }>
              <Grid container spacing={2} direction="column" alignItems='center'>
                <Grid item>
                  <CardMedia image={global_icon} className={ classes.icon } />
                </Grid>
                <Grid item xs>
                  <BoldTitle>
                    Global
                  </BoldTitle>
                </Grid>
              </Grid>
            </Grid>
            <Grid item onClick={ () => setMode('team') } className={ classes.link }>
              <Grid container spacing={2} direction="column" alignItems='center'>
                <Grid item>
                  <CardMedia image={team_icon} className={ classes.icon } />
                </Grid>
                <Grid item xs>
                  <BoldTitle>
                    Equipe
                  </BoldTitle>
                </Grid>
              </Grid>
            </Grid>
            <Grid item onClick={ () => setMode('individual') } className={ classes.link }>
              <Grid container spacing={2} direction="column" alignItems='center'>
                <Grid item>
                  <CardMedia image={individual_icon} className={ classes.icon } />
                </Grid>
                <Grid item xs>
                  <BoldTitle>
                    Individuel
                  </BoldTitle>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) }

      { mode === 'team' && (
        <TeamSelector onClick={ team => {setTeam(team)} } />
      ) }
      { mode === 'individual' && (
        <AdministratorCollaboratorSelector onClick={ (collaborator, team) => {
            setCollaborator(collaborator)
            setTeam(team)
          } } />
      ) }
    </React.Fragment>
  )
}


class AdminGoalPointModeSelectWrapper extends MainLayoutComponent {
  componentDidMount() {
    this.props.activateReturn();
    this.props.handleTitle('Administration');
    this.props.handleSubHeader(<AppBarSubTitle title='Configuration des points des objectifs' />);
  }
  render() {
    const MainComponent = withRouter(withStyles(styles)(AdminGoalPointModeSelect))
    return (
      <div >
        <MainComponent {...this.props} />
      </div>
    )
  }
}

export default AdminGoalPointModeSelectWrapper
