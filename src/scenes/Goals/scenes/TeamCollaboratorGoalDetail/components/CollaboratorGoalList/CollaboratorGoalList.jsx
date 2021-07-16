import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AccentText, Card, DefaultText, DefaultTitle, EmptyState, ErrorText, InfoText, Loader, ProgressButton, TextField, Avatar } from '../../../../../../components'
import * as collaboratorGoalListActions from '../../../../../../services/CollaboratorGoals/CollaboratorGoalList/actions'
import * as playerGoalListUpdateActions from '../../../../../../services/PlayerGoals/PlayerGoalListUpdate/actions'
import '../../../../../../helpers/FormsyHelper'
import * as Resources from "../../../../../../Resources";
import _ from 'lodash'

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
    }

    componentDidMount() {
        const { goal } = this.props.teamCollaboratorGoalDetail;
        this.props.collaboratorGoalListActions.getCollaboratorGoalListByTeamCollaboratorGoal(goal.id)
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
                <EmptyState title={Resources.COLLABORATOR_GOAL_LIST_EDITION_EMPTY_STATE_TITLE} message={Resources.COLLABORATOR_GOAL_LIST_EDITION_EMPTY_STATE_MESSAGE} />
            </div>
        )
    }

    convertToGoals(model) {
        const goals = [];
        const keys = Object.keys(model);
        keys.map(key => {
            if (key !== 'remainingTarget') {
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
        const { goals } = this.props.collaboratorGoalList;
        const { goal: parentGoal } = this.props.teamCollaboratorGoalDetail;
        const { loading } = this.props.playerGoalListUpdate;
        const { account } = this.props.accountDetail;
        const goalCount = goals.length;
        const isRate = parentGoal.isRate;
        const maxTarget = parentGoal.maxTarget;
        var initialAllTarget = goals.map(goal => Number(goal.target)).reduce((a, b) => a + b);
        if (isRate) initialAllTarget = goalCount > 0 ? Math.ceil(initialAllTarget / goalCount) : 0;
        var allTarget = initialAllTarget;
        if (this.state.targetSum != null && !isRate) allTarget = this.state.targetSum;
        if (this.state.targetSum != null && isRate) allTarget = goalCount > 0 ? Math.ceil(this.state.targetSum / goalCount) : 0;

        const remainingTarget = maxTarget - allTarget;
        const canSubmit = remainingTarget >= 0 || parentGoal.definition.allow_over_target
        const now = new Date()
        const isPast = new Date(parentGoal.end * 1000) < now
        const readonly = !parentGoal.definition.isActive
        const editable = !isPast || (parentGoal.definition.past_editable && account.role.code === 'A')

        return (
            <div>
                <DefaultTitle className={classes.title}>{Resources.COLLABORATOR_GOAL_LIST_EDITION_TITLE}</DefaultTitle>
                <div className={classes.indicators}>
                    <Card>
                        <div className={classes.indicatorsContent}>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <DefaultText>{Resources.COLLABORATOR_GOAL_LIST_EDITION_MAX_TARGET_LABEL}</DefaultText>
                                    <InfoText>{maxTarget}</InfoText>
                                </Grid>
                                <Grid item>
                                    <DefaultText>{Resources.COLLABORATOR_GOAL_LIST_EDITION_ALL_TARGET_LABEL}</DefaultText>
                                    <InfoText>{allTarget}</InfoText>
                                </Grid>
                                <Grid item>
                                    <DefaultText>{Resources.COLLABORATOR_GOAL_LIST_EDITION_REMAINING_TARGET_LABEL}</DefaultText>
                                    { remainingTarget >= 0 && <AccentText>{remainingTarget}</AccentText> }
                                    { remainingTarget < 0 && <ErrorText>{remainingTarget}</ErrorText> }
                                </Grid>
                            </Grid>
                        </div>
                    </Card>
                </div>
                <Formsy onChange={this.handleChange.bind(this)} onValidSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={2}>
                        { goals.map((goal) => {
                            const photo = goal.collaborator.photo ? goal.collaborator.photo : '/assets/img/user/avatar.svg';

                            return (
                                <Grid key={goal.id} item xs={3} container spacing={1}>
                                    <Grid item>
                                        <Avatar src={photo} className={classes.avatar} entityId={ _.get(goal, 'collaborator.id') } fallbackName={ _.get(goal, 'collaborator.fullname') } />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField type='number' name={goal.id} label={goal.collaborator.fullname} initial={goal.target} required
                                            validations={{
                                                isInt: true,
                                                isMoreThanOrEquals: 0
                                            }}
                                            validationErrors={{
                                                isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                isInt: Resources.COMMON_IS_INT_ERROR,
                                                isMoreThanOrEquals: Resources.COMMON_IS_MORE_THAN_OR_EQUALS_0_ERROR
                                            }}
                                            disabled={!editable || readonly}
                                        />
                                    </Grid>
                                </Grid>
                            )
                        }) }
                    </Grid>
                    <div className={classes.formFooter}>
                        { !canSubmit && <ErrorText className={classes.error} align='center'>{Resources.COLLABORATOR_GOAL_LIST_EDITION_ERROR_TEXT}</ErrorText> }
                        <ProgressButton type='submit' text={Resources.COLLABORATOR_GOAL_LIST_EDITION_SUBMIT_BUTTON} loading={loading} disabled={!canSubmit || !editable || readonly} centered />
                    </div>
                </Formsy>
            </div>
        )
    }

    render() {
        const { goals, loading } = this.props.collaboratorGoalList;

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && goals && goals.length > 0 && this.renderForm() }
                { !loading && goals && goals.length == 0 && this.renderEmptyState() }
            </div>
        )
    }
}

const mapStateToProps = ({ collaboratorGoalList, goalDefinitionDetail, playerGoalListUpdate, teamCollaboratorGoalDetail, accountDetail }) => ({
    collaboratorGoalList,
    goalDefinitionDetail,
    playerGoalListUpdate,
    teamCollaboratorGoalDetail,
    accountDetail
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorGoalListActions: bindActionCreators(collaboratorGoalListActions, dispatch),
    playerGoalListUpdateActions: bindActionCreators(playerGoalListUpdateActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CollaboratorGoalList))
