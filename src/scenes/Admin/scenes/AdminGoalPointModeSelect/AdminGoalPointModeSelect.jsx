import React, { useState } from 'react'
import { Grid, CardMedia } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { DefaultText, TeamSelector, AdministratorCollaboratorSelector, AppBarSubTitle, MainLayoutComponent } from '../../../../components'
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

const AdminGoalPointModeSelect = ({ onChange, classes, ...props }) => {
  const global_icon = require(`../../../../assets/img/system/goalPoints/global.svg`)
  const team_icon = require(`../../../../assets/img/system/goalPoints/team.svg`)
  // const individual_icon = require(`../../../../assets/img/system/goalPoints/TCO.svg`)


  const [mode, setMode] = useState()
  const [team, setTeam] = useState()
  const [collaborator, setCollaborator] = useState()
  return (
    <React.Fragment>
      { !mode && (
        <Grid container direction="row" justify="center" spacing={8}>
          <Grid item onClick={ () => setMode('global') } className={ classes.link }>
            <Grid container spacing={2} direction="column" alignItems='center'>
              <Grid item>
                <CardMedia image={global_icon} className={ classes.icon } />
              </Grid>
              <Grid item xs>
                <DefaultText>
                  Global
                </DefaultText>
              </Grid>
            </Grid>
          </Grid>
          <Grid item onClick={ () => setMode('team') } className={ classes.link }>
            <Grid container spacing={2} direction="column" alignItems='center'>
              <Grid item>
                <CardMedia image={team_icon} className={ classes.icon } />
              </Grid>
              <Grid item xs>
                <DefaultText>
                  Equipe
                </DefaultText>
              </Grid>
            </Grid>
          </Grid>
          <Grid item onClick={ () => setMode('individual') } className={ classes.link }>
            <Grid container spacing={2} direction="column" alignItems='center'>
              <Grid item>
                <CardMedia image={team_icon} className={ classes.icon } />
              </Grid>
              <Grid item xs>
                <DefaultText>
                  Individuel
                </DefaultText>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) }
      { mode === 'global' && (
        <Redirect to={`/admin/periods/${ props.match.params.periodId }/goal-levels`} />
      ) }
      { team && !collaborator && (
        <Redirect to={`/admin/periods/${ props.match.params.periodId }/goal-levels?team=${team}`} />
      ) }
      { collaborator && team && (
        <Redirect to={`/admin/periods/${ props.match.params.periodId }/goal-levels?collaborator=${ collaborator }&team=${team}`} />
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
    this.props.handleSubHeader(<AppBarSubTitle title='Configuration des points des objectifs' />);
  }
  render() {
    const MainComponent = withStyles(styles)(AdminGoalPointModeSelect)
    return (
      <MainComponent {...this.props} />
    )
  }
}

export default AdminGoalPointModeSelectWrapper
