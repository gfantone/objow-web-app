import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AccentText, Card, DefaultText, DefaultTitle, EmptyState, ErrorText, InfoText, Loader, ProgressButton, TextField, Avatar } from '../../../../../../../../components'
import * as playerGoalListActions from '../../../../../../../../services/PlayerGoals/PlayerGoalList/actions'
import * as playerGoalListUpdateActions from '../../../../../../../../services/PlayerGoals/PlayerGoalListUpdate/actions'
import * as teamPlayerGoalDetailActions from '../../../../../../../../services/TeamPlayerGoals/TeamPlayerGoalDetail/actions'
import '../../../../../../../../helpers/FormsyHelper'
import * as Resources from "../../../../../../../../Resources";
import _ from 'lodash'

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
    },
    avatar: {
        width: 48,
        height: 48
    }
};

class CollaboratorGoalList extends Component {
    constructor(props) {
        super(props);
        this.date = null;
        this.team = null;
        this.state = {
            targetSum: null
        }
        this.loadData(props)
    }

    loadData(props) {
        const date = props.date;
        const team = props.team;
        if (date != this.date || team != this.team) {
            this.state.targetSum = null;
            this.date = date;
            this.team = team;
            const definitionId = props.goalDefinitionDetail.definition.id;
            props.teamPlayerGoalDetailActions.getTeamPlayerGoalDetail(definitionId, date, team);
            props.playerGoalListActions.getPlayerGoalList(definitionId, date, team)
        }
    }

    componentDidMount() {
        this.loadData(this.props)
    }

    componentWillReceiveProps(props) {
        this.loadData(props)
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
        const goals = [];
        const keys = Object.keys(model);
        keys.map(key => {
            if (key != 'remainingTarget') {
                const goal = { id: key, target: model[key] };
                goals.push(goal)
            }
        });
        return goals
    }

    handleChange(model) {
        const goals = this.convertToGoals(model);
        var targetSum = goals.map(goal => Number(goal.target)).reduce((a, b) => a + b);
        this.setState({
            ...this.state,
            targetSum: targetSum
        })
    }

    handleSubmit(model) {
        const goals = this.convertToGoals(model);
        this.props.playerGoalListUpdateActions.updatePlayerGoalList(goals)
    }

    renderForm() {
        const { classes } = this.props;
        const { goals } = this.props.playerGoalList;
        const { goal: parentGoal } = this.props.teamPlayerGoalDetail;
        const { account } = this.props.accountDetail;
        const { loading } = this.props.playerGoalListUpdate;
        const goalCount = goals.length;
        const isRate = parentGoal.goal.definition.kpi.unit.isRate;
        const maxTarget = parentGoal.target;
        var initialAllTarget = goals.map(goal => Number(goal.target)).reduce((a, b) => a + b);
        if (isRate) initialAllTarget = goalCount > 0 ? Math.ceil(initialAllTarget / goalCount) : 0;
        var allTarget = initialAllTarget;
        if (this.state.targetSum != null && !isRate) allTarget = this.state.targetSum;
        if (this.state.targetSum != null && isRate) allTarget = goalCount > 0 ? Math.ceil(this.state.targetSum / goalCount) : 0;
        const remainingTarget = maxTarget - allTarget

        const canSubmit = remainingTarget >= 0 || parentGoal.goal.definition.allow_over_target
        const now = new Date()
        const isPast = new Date(parentGoal.goal.end * 1000) < now
        const readonly = !parentGoal.goal.definition.isActive
        const editable = !isPast || (parentGoal.goal.definition.past_editable && account.role.code === 'A')

        return (
            <div>
                <DefaultTitle className={classes.title}>Indicateurs</DefaultTitle>
                <div className={classes.indicators}>
                    <Card>
                        <Grid container justify='space-between'>
                            <Grid item>
                                <DefaultText>Objectif alloué pour la période sélectionnée</DefaultText>
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
                            const photo = goal.collaborator.photo ? goal.collaborator.photo : '/assets/img/user/avatar.svg';

                            return (
                                <Grid key={goal.id} item xs={3} container spacing={1}>
                                    <Grid item>
                                        <Avatar src={photo} className={classes.avatar} id={ _.get(goal, 'collaborator.id') } fallbackName={ _.get(goal, 'collaborator.fullname') }/>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField type='number' name={goal.id} label={goal.collaborator.fullname} initial={goal.target} required disabled={!editable || readonly}
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
                                </Grid>
                            )
                        }) }
                    </Grid>
                    {!readonly && <div className={classes.formFooter}>
                        { !canSubmit && <ErrorText className={classes.error} align='center'>Veuillez respecter l'objectif total alloué pour la période sélectionnée</ErrorText> }
                        <ProgressButton type='submit' text='Valider' loading={loading} disabled={!canSubmit || !editable || readonly} centered />
                    </div>}
                </Formsy>
            </div>
        )
    }

    render() {
        const { goals, loading: playerGoalListLoading } = this.props.playerGoalList;
        const { goal: goalDetail, loading: teamPlayerGoalDetailLoading } = this.props.teamPlayerGoalDetail;
        const loading = playerGoalListLoading || teamPlayerGoalDetailLoading;
        const hasGoals = goals.length > 0 && goalDetail;
        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && hasGoals && this.renderForm() }
                { !loading && !hasGoals && this.renderEmptyState() }
            </div>
        )
    }
}

const mapStateToProps = ({ goalDefinitionDetail, playerGoalList, playerGoalListUpdate, teamPlayerGoalDetail, accountDetail }) => ({
    goalDefinitionDetail,
    playerGoalList,
    playerGoalListUpdate,
    teamPlayerGoalDetail,
    accountDetail
});

const mapDispatchToProps = (dispatch) => ({
    playerGoalListActions: bindActionCreators(playerGoalListActions, dispatch),
    playerGoalListUpdateActions: bindActionCreators(playerGoalListUpdateActions, dispatch),
    teamPlayerGoalDetailActions: bindActionCreators(teamPlayerGoalDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CollaboratorGoalList))
