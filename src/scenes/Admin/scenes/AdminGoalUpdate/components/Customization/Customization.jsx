import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Tooltip} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {Filters, TeamCollaboratorGoalList, TeamGoalList, CollaboratorGoalList, GoalList, Spreadsheet} from './components'
import {DefaultTitle, EmptyState, Loader} from '../../../../../../components'
import * as teamListActions from '../../../../../../services/Teams/TeamList/actions'
import {bindActionCreators} from 'redux'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faTable} from "@fortawesome/free-solid-svg-icons";

const styles = {
    title: {
        marginBottom: 16
    },
    filters: {
        marginBottom: 32
    },
    buttons: {
      marginBottom: 20,

    },
    iconButton: {
      opacity: 0.6,
      fontSize: 16,
      color: '#555',
      cursor: 'pointer',
      '&:hover, &.active': {
        opacity: 1,
      }
    }
}
class Customization extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: null,
            team: null,
            page: 1
        }
    }

    componentDidMount() {
        this.props.teamListActions.getTeamList()
    }

    handleChange = name => value => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const {definition} = this.props.goalDefinitionDetail
        const now = new Date()
        const date = definition.periodicity.code != 'Y' ? this.state.date : new Date(Date.UTC(now.getFullYear(), 0, 1))

        return (
            <div>
                <Grid container justify="flex-end" className={this.props.classes.buttons} spacing={1}>
                  <Tooltip title="Configuration">
                    <Grid item onClick={() => this.handleChange('page')(1)} className={`${this.props.classes.iconButton} ${ this.state.page === 1 ? 'active' : '' }`}>
                      <FontAwesomeIcon icon={faCog} />
                    </Grid>
                  </Tooltip>
                  <Tooltip title="Tableur">
                    <Grid item onClick={() => this.handleChange('page')(2)} className={`${this.props.classes.iconButton} ${ this.state.page === 2 ? 'active' : '' }`}>
                      <FontAwesomeIcon icon={faTable} />
                    </Grid>
                  </Tooltip>
                </Grid>
                { this.state.page === 1  && (
                  <Grid container spacing={4} style={{ zIndex: 1 }}>
                    {(definition.type.code == 'C' || definition.periodicity.code != 'Y') && <Grid item container spacing={1}>
                      <Grid item xs={12} style={{ zIndex: 1 }}>
                        <DefaultTitle>Filtres</DefaultTitle>
                      </Grid>
                      <Grid item xs={12}>
                        <Filters onDateChange={this.handleChange('date').bind(this)} onTeamChange={this.handleChange('team').bind(this)} />
                      </Grid>
                    </Grid>}
                    <Grid item xs={12}>
                      {!date && !this.state.team && <GoalList />}
                      {definition.type.code == 'T' && date && <TeamGoalList date={date} />}
                      {definition.type.code == 'C' && date && !this.state.team && <TeamCollaboratorGoalList date={date} />}
                      {definition.type.code == 'C' && date && this.state.team && <CollaboratorGoalList date={date} team={this.state.team} />}
                      {!date && this.state.team && <EmptyState title='Aucun période sélectionnée' message='Veuillez renseigner une période pour afficher des objectifs' />}
                    </Grid>
                  </Grid>
                )}
                { this.state.page === 2 && (
                  <Spreadsheet />
                )}
            </div>
        )
    }

    render() {
        const {teams, loading} = this.props.teamList
        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && teams && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({goalDefinitionDetail, teamList}) => ({
    goalDefinitionDetail,
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    teamListActions: bindActionCreators(teamListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Customization))
