import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Tooltip} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {Filters, TeamCollaboratorGoalList, TeamGoalList, CollaboratorGoalList, GoalList, Spreadsheet} from './components'
import {DefaultTitle, EmptyState, Loader, NavigationSwitch} from '../../../../../../components'
import * as Formsy from 'formsy-react'
import * as teamListActions from '../../../../../../services/Teams/TeamList/actions'
import {bindActionCreators} from 'redux'
import {faTable, faBars} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const styles = {
    title: {
        marginBottom: 16
    },
    filters: {
        marginBottom: 32
    },
    linkWrapper: {
      marginBottom: 10
    },
    link: {
      fontSize: 20,
      cursor: 'pointer',
      '&:hover, &.active': {
        color: 'rgb(15,111,222)',
        opacity: 1,
      }
    },
}
class Customization extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: null,
            team: null,
            page: 1
        }
        this.switch = React.createRef();
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
        const {teams} = this.props.teamList
        const now = new Date()
        const date = definition.periodicity.code != 'Y' ? this.state.date : new Date(Date.UTC(now.getFullYear(), 0, 1))
        const isSpreadSheet = this.state.page === 2

        if(this.state.page === 2 && !this.state.team) {
          this.handleChange('team')(teams[0].id)
        }

        return (
            <div>
                <Grid container justify="flex-end" spacing={1}>
                  <Grid item >
                    <Grid container alignItems="center" spacing={1} className={ this.props.classes.linkWrapper }>
                      <Grid item onClick={() => this.handleChange('page')(1)} className={ `${this.props.classes.link} ${!isSpreadSheet ? 'active' : ''}` }>
                        Classique
                      </Grid>
                      <Grid item>
                          <NavigationSwitch
                            onChange={(event) => {this.handleChange('page')(event.target.checked ? 2 : 1)}}
                            defaultChecked={false}
                            color="default"
                            ref={this.switch}
                            checked={isSpreadSheet}
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                          />
                      </Grid>
                      <Grid item onClick={() => this.handleChange('page')(2) } className={ `${this.props.classes.link} ${isSpreadSheet ? 'active' : ''}` }>
                        Tableur
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={4} style={{ zIndex: 1 }}>
                  {(definition.type.code == 'C' || definition.periodicity.code != 'Y') && (definition.type.code !== 'T' || this.state.page !== 2) && <Grid item container spacing={1}>
                    <Grid item xs={12} style={{ zIndex: 1 }}>
                        <DefaultTitle>Filtres</DefaultTitle>
                      </Grid>
                      <Grid item xs={12}>
                        <Filters defaultDate={this.state.date} emptyDisabledTeam={this.state.page === 2} displayDateFilter={this.state.page !== 2} onDateChange={this.handleChange('date').bind(this)} onTeamChange={this.handleChange('team').bind(this)} />
                      </Grid>
                    </Grid>
                  }
                  { this.state.page === 1  && (
                    <Grid item xs={12}>
                      {!date && !this.state.team && <GoalList />}
                      {definition.type.code == 'T' && date && <TeamGoalList date={date} />}
                      {definition.type.code == 'C' && date && !this.state.team && <TeamCollaboratorGoalList date={date} />}
                      {definition.type.code == 'C' && date && this.state.team && <CollaboratorGoalList date={date} team={this.state.team} />}
                      {!date && this.state.team && <EmptyState title='Aucun période sélectionnée' message='Veuillez renseigner une période pour afficher des objectifs' />}
                    </Grid>
                  )}
                </Grid>
                { this.state.page === 2 && (
                  <Spreadsheet team={this.state.team} />
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
