import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AccentText, Card, DefaultText, DefaultTitle, EmptyState, ErrorText, InfoText, Loader, ProgressButton, TextField } from '../../../../../../../../components'
import * as goalListActions from '../../../../../../../../services/Goals/GoalList/actions'
import * as goalListUpdateActions from '../../../../../../../../services/Goals/GoalListUpdate/actions'
import '../../../../../../../../helpers/FormsyHelper'
import '../../../../../../../../helpers/DateHelper'
import '../../../../../../../../helpers/NumberHelper'
import * as Resources from "../../../../../../../../Resources";

const styles = {
    title: {
        marginBottom: 16
    },
    indicators: {
        marginBottom: 32
    },
    formFooter: {
        marginTop: 32
    },
    error: {
        marginBottom: 16
    }
}

class GoalList extends Component {
    constructor(props) {
        super(props)
        this.date = null
        this.state = {
            targetSum: null
        }
    }

    componentDidMount() {
        const { definition } = this.props.goalDefinitionDetail
        this.props.goalListActions.getGoalList(definition.id)
    }

    renderLoader() {
        return (
            <div>
                <Loader centered />
            </div>
        )
    }

    renderEmptyState() {
        return (
            <div>
                <EmptyState title='Aucun objectif trouvé' message="Si vous avez appliqué des filtres, changez-les pour afficher d'autres objectifs" />
            </div>
        )
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
        this.props.goalListUpdateActions.updateGoalList(goals)
    }

    renderForm() {
        const { classes } = this.props
        const { goals } = this.props.goalList
        const { definition: parentGoal } = this.props.goalDefinitionDetail
        const { loading } = this.props.goalListUpdate
        const goalCount = goals.length
        const isRate = parentGoal.kpi.unit.isRate
        const maxTarget = parentGoal.target
        var initialAllTarget = goals.map(goal => Number(goal.target)).reduce((a, b) => a + b)
        if (isRate) initialAllTarget = goalCount > 0 ? Math.ceil(initialAllTarget / goalCount) : 0
        var allTarget = initialAllTarget
        if (this.state.targetSum != null && !isRate) allTarget = this.state.targetSum
        if (this.state.targetSum != null && isRate) allTarget = goalCount > 0 ? Math.ceil(this.state.targetSum / goalCount) : 0
        const remainingTarget = maxTarget - allTarget
        const canSubmit = remainingTarget >= 0
        const now = new Date()
        const readonly = !parentGoal.isActive

        return (
            <div>
                <DefaultTitle className={classes.title}>Indicateurs</DefaultTitle>
                <div className={classes.indicators}>
                    <Card>
                        <Grid container justify='space-between'>
                            <Grid item>
                                <DefaultText>Objectif alloué pour l'année</DefaultText>
                                <InfoText>{maxTarget}</InfoText>
                            </Grid>
                            <Grid item>
                                <DefaultText>Objectif utilisé</DefaultText>
                                <InfoText>{allTarget}</InfoText>
                            </Grid>
                            <Grid item>
                                <DefaultText>Objectif restant</DefaultText>
                                { remainingTarget >= 0 && <AccentText>{remainingTarget}</AccentText> }
                                { remainingTarget < 0 && <ErrorText>{remainingTarget}</ErrorText> }
                            </Grid>
                        </Grid>
                    </Card>
                </div>
                <Formsy onChange={this.handleChange.bind(this)} onValidSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={2}>
                        { goals.map((goal) => {
                            const name = parentGoal.periodicity.code == 'Y' ? 'Année ' + goal.start.toDate().getFullYear()
                                : parentGoal.periodicity.code == 'S' ? 'Semestre ' + goal.start.toDate().getSemesterNumber()
                                : parentGoal.periodicity.code == 'Q' ? 'Trimestre ' + goal.start.toDate().getQuarterNumber()
                                : parentGoal.periodicity.code == 'M' ? Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(goal.start.toDate())
                                : parentGoal.periodicity.code == 'W' ? 'Semaine ' + goal.start.toDate().getWeekNumber()
                                : ''
                            const editable = (goal.start.toDate() <= now && now <= goal.end.toDate()) || goal.start.toDate() >= now
                            return (
                                <Grid key={goal.id} item xs={3}>
                                    <TextField type='number' name={goal.id} label={name} initial={goal.target} disabled={!editable || readonly} fullWidth required
                                        validations={{
                                            isInt: true,
                                            isMoreThanOrEquals: 0
                                        }}
                                        validationErrors={{
                                            isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                            isInt: "L'objectif doit être un nombre entier.",
                                            isMoreThanOrEquals: "L'objectif doit être supérieur ou égal à 0."
                                        }}
                                    />
                                </Grid>
                            )
                        }) }
                    </Grid>
                    {!readonly && <div className={classes.formFooter}>
                        { !canSubmit && <ErrorText className={classes.error} align='center'>Veuillez respecter l'objectif total alloué pour la période sélectionnée</ErrorText> }
                        <ProgressButton type='submit' text='Valider' loading={loading} disabled={!canSubmit} centered />
                    </div>}
                </Formsy>
            </div>
        )
    }

    render() {
        const { goals, loading: goalListLoading } = this.props.goalList
        const { loading: goalDetailLoading } = this.props.goalDetail
        const loading = goalListLoading || goalDetailLoading
        const hasGoals = goals && goals.length > 0

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && hasGoals && this.renderForm() }
                { !loading && !hasGoals && this.renderEmptyState() }
            </div>
        )
    }
}

const mapStateToProps = ({ goalDefinitionDetail, goalDetail, goalList, goalListUpdate }) => ({
    goalDefinitionDetail,
    goalDetail,
    goalList,
    goalListUpdate
})

const mapDispatchToProps = (dispatch) => ({
    goalListActions: bindActionCreators(goalListActions, dispatch),
    goalListUpdateActions: bindActionCreators(goalListUpdateActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GoalList))
