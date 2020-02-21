import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AccentText, Card, DefaultText, DefaultTitle, ErrorText, GenericPlayerGoal, InfoText, ProgressButton } from '../../../../../../components'
import * as playerGoalListUpdateActions from '../../../../../../services/PlayerGoals/PlayerGoalListUpdate/actions'
import * as teamPlayerGoalDetailActions from '../../../../../../services/TeamPlayerGoals/TeamPlayerGoalDetail/actions'

const styles = {
    title: {
        marginBottom: 16
    },
    indicators: {
        marginBottom: 32
    },
    indicatorsContent: {
        margin: 16
    },
    formFooter: {
        marginTop: 32
    },
    error: {
        marginBottom: 16
    }
}

class PlayerTeamGoalList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            targetSum: null
        }
    }

    convertToGoals(model) {
        const goals = []
        const keys = Object.keys(model)
        keys.map(key => {
            if (key != 'remainingTarget') {
                const goal = { id: key, target: model[key] }
                goals.push(goal)
            }
        })
        return goals
    }

    handleChange(model) {
        const goals = this.convertToGoals(model)
        var targetSum = goals.map(goal => Number(goal.target)).reduce((a, b) => a + b)
        this.setState({
            ...this.state,
            targetSum: targetSum
        })
    }

    handleSubmit(model) {
        const goals = this.convertToGoals(model)
        this.props.playerGoalListUpdateActions.updatePlayerGoalList(goals)
    }

    render() {
        const { classes } = this.props
        const { goal: parentGoal } = this.props.userGoalDetail
        const { loading } = this.props.playerGoalListUpdate
        const targetMax = parentGoal.target
        const initialTargetSum = this.props.goals.map(goal => Number(goal.target)).reduce((a, b) => a + b)
        const targetSum = this.state.targetSum != null ? this.state.targetSum : initialTargetSum
        const remainingTarget = targetMax - targetSum
        const canSubmit = remainingTarget >= 0

        return (
            <div>
                <DefaultTitle className={classes.title}>Indicateurs</DefaultTitle>
                <div className={classes.indicators}>
                    <Card>
                        <div className={classes.indicatorsContent}>
                            <Grid container justify='space-between'>
                                <Grid item xs={12} sm='auto'>
                                    <DefaultText>Objectif alloué</DefaultText>
                                    <InfoText>{targetMax}</InfoText>
                                </Grid>
                                <Grid item xs={12} sm='auto'>
                                    <DefaultText>Objectif utilisé</DefaultText>
                                    <InfoText>{targetSum}</InfoText>
                                </Grid>
                                <Grid item xs={12} sm='auto'>
                                    <DefaultText>Objectif restant</DefaultText>
                                    { remainingTarget >= 0 && <AccentText>{remainingTarget}</AccentText> }
                                    { remainingTarget < 0 && <ErrorText>{remainingTarget}</ErrorText> }
                                </Grid>
                            </Grid>
                        </div>
                    </Card>
                </div>
                <Formsy onChange={this.handleChange.bind(this)} onSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={2}>
                        { this.props.goals.map((goal) => {
                            return (
                                <Grid key={goal.id} item xs={6} sm={4} md={3}>
                                    <GenericPlayerGoal key={goal.id} goal={goal} />
                                </Grid>
                            )
                        }) }
                    </Grid>
                    <div className={classes.formFooter}>
                        { !canSubmit && <ErrorText className={classes.error} align='center'>Veuillez respecter l'objectif total alloué pour la période sélectionnée</ErrorText> }
                        <ProgressButton type='submit' text='Valider' loading={loading} disabled={!canSubmit} centered />
                    </div>
                </Formsy>
            </div>
        )
    }
}

const mapStateToProps = ({ playerGoalListUpdate, userGoalDetail }) => ({
    playerGoalListUpdate,
    userGoalDetail
})

const mapDispatchToProps = (dispatch) => ({
    playerGoalListUpdateActions: bindActionCreators(playerGoalListUpdateActions, dispatch),
    teamPlayerGoalDetailActions: bindActionCreators(teamPlayerGoalDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlayerTeamGoalList))