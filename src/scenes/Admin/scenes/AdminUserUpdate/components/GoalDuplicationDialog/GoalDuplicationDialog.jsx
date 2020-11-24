import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid} from '@material-ui/core'
import {Button, DefaultText, ProgressButton, Select} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as collaboratorGoalListDuplicationActions from '../../../../../../services/CollaboratorGoals/CollaboratorGoalListDuplication/actions'
import '../../../../../../helpers/StringHelper'

const GoalDuplicationDialog = ({allCollaborators, teams, user, ...props}) => {
    const {success, loading} = props.collaboratorGoalListDuplication
    const [collaborator, setCollaborator] = React.useState(null)
    const [duplicationOpen, setDuplicationOpen] = React.useState(false)
    const [duplicationConfirmationOpen, setDuplicationConfirmationOpen] = React.useState(false)
    const [team, setTeam] = React.useState(null)
    const selectedTeam = team ? teams.filter(x => x.id === team)[0] : null
    const collaborators = selectedTeam ? selectedTeam.collaborators.filter(x => x.id !== user.id) : allCollaborators.filter(x => x.id !== user.id)
    const selectedCollaborator = collaborator ? collaborators.filter(x => x.id === collaborator)[0] : null
    const selectedCollaboratorFullname = selectedCollaborator ? selectedCollaborator.fullname : ""

    useEffect(() => {
        props.collaboratorGoalListDuplicationActions.clearCollaboratorGoalListDuplication()
    }, [])

    if (success) {
        props.collaboratorGoalListDuplicationActions.clearCollaboratorGoalListDuplication()
        props.history.goBack()
    }

    function handleCollaboratorChange(newCollaborator) {
        newCollaborator ? setCollaborator(Number(newCollaborator)) : setCollaborator(null)
    }

    function handleConfirmClick() {
        props.collaboratorGoalListDuplicationActions.duplicateCollaboratorGoalList(collaborator, user.id)
    }

    function handleTeamChange(newTeam) {
        newTeam ? setTeam(Number(newTeam)) : setTeam(null)
    }

    function handleValidSubmit(model) {
        setDuplicationConfirmationOpen(true)
    }

    return (
        <div>
            {user.role.code === 'C' && <Button type='button' color='secondary' onClick={() => setDuplicationOpen(true)}>{Resources.GOAL_DUPLICATION_DIALOG_BUTTON}</Button>}
            <Dialog open={duplicationOpen || loading} onClose={() => setDuplicationOpen(false)}>
                <Formsy onValidSubmit={handleValidSubmit}>
                    <DialogTitle>{Resources.GOAL_DUPLICATION_DIALOG_TITLE}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <DefaultText>{Resources.GOAL_DUPLICATION_DIALOG_MESSAGE.format(user.fullname)}</DefaultText>
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    emptyText={Resources.GOAL_DUPLICATION_DIALOG_TEAM_EMPTY_TEXT}
                                    fullWidth
                                    label={Resources.GOAL_DUPLICATION_DIALOG_TEAM_LABEL}
                                    name='team'
                                    optionValueName='id'
                                    options={teams}
                                    optionTextName='name'
                                    onChange={handleTeamChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    emptyText={Resources.GOAL_DUPLICATION_DIALOG_COLLABORATOR_EMPTY_TEXT}
                                    fullWidth
                                    label={Resources.GOAL_DUPLICATION_DIALOG_COLLABORATOR_LABEL}
                                    name='collaborator'
                                    optionValueName='id'
                                    options={collaborators}
                                    optionTextName='fullname'
                                    required
                                    validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                    onChange={handleCollaboratorChange}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button color='secondary' onClick={() => setDuplicationOpen(false)}>{Resources.GOAL_DUPLICATION_DIALOG_CANCEL_BUTTON}</Button>
                        <Button type='submit'>{Resources.GOAL_DUPLICATION_DIALOG_SUBMIT_BUTTON}</Button>
                    </DialogActions>
                </Formsy>
            </Dialog>
            <Dialog open={duplicationConfirmationOpen || loading} onClose={() => setDuplicationConfirmationOpen(false)}>
                <Formsy>
                    <DialogContent>
                        <DefaultText>{Resources.GOAL_DUPLICATION_DIALOG_CONFIRMATION_MESSAGE.format(user.fullname, selectedCollaboratorFullname)}</DefaultText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='secondary' onClick={() => setDuplicationConfirmationOpen(false)}>{Resources.GOAL_DUPLICATION_DIALOG_CONFIRMATION_NO_BUTTON}</Button>
                        <ProgressButton type='submit' text={Resources.GOAL_DUPLICATION_DIALOG_CONFIRMATION_YES_BUTTON} loading={loading} onClick={handleConfirmClick} />
                    </DialogActions>
                </Formsy>
            </Dialog>
        </div>
    )
}

const mapStateToProps = ({collaboratorGoalListDuplication}) => ({
    collaboratorGoalListDuplication
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorGoalListDuplicationActions: bindActionCreators(collaboratorGoalListDuplicationActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GoalDuplicationDialog))
