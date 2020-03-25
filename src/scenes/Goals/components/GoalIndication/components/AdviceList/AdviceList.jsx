import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {Grid, IconButton} from '@material-ui/core'
import {Card, DefaultTitle, ProgressButton, TableChip, TextField} from '../../../../../../components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {uuidv4} from '../../../../../../helpers/UUIDHelper'
import * as goalAdviceListCreationActions from '../../../../../../services/GoalAdvices/GoalAdviceListCreation/actions'

const AdviceList = ({advices, goal, type, ...props}) => {
    const [newAdvices, setNewAdvices] = React.useState(advices.map(x => ({key: uuidv4(), text: x.text})));
    const {loading} = props.goalAdviceListCreation;

    const onAdd = () => {
        setNewAdvices(newAdvices => newAdvices.concat([{key: uuidv4(), text: ''}]))
    };

    const onRemove = (key) => {
        setNewAdvices(newAdvices => newAdvices.filter(x => x.key != key))
    };

    const onSubmit = (model) => {
        const advices = model.advices ? model.advices.map(x => ({text: x, goal: goal.goalId, team: goal.teamId})) : [];
        switch (type) {
            case 'C':
                props.goalAdviceListCreationActions.createGoalAdviceListByCollaboratorGoal(advices, goal.id);
                break;
            case 'TC':
                props.goalAdviceListCreationActions.createGoalAdviceListByTeamCollaboratorGoal(advices, goal.id);
                break;
            case 'T':
                props.goalAdviceListCreationActions.createGoalAdviceListByTeamGoal(advices, goal.id);
                break
        }
    };

    return (
        <div>
            <Formsy onValidSubmit={onSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <DefaultTitle style={{marginTop: 2}}>Les conseils du coach</DefaultTitle>
                            </Grid>
                            <Grid item>
                                <IconButton size='small' onClick={onAdd}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                {newAdvices.map((advice, index) => {
                                    return (
                                        <Grid key={advice.key} item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <TableChip label='>' style={{marginTop: 4}} />
                                                </Grid>
                                                <Grid item xs>
                                                    <TextField name={`advices[${index}]`} initial={advice.text} multiline fullWidth />
                                                </Grid>
                                                <Grid item>
                                                    <IconButton size='small' style={{marginTop: 4}} onClick={() => onRemove(advice.key)}>
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                                <Grid item xs={12}>
                                    <ProgressButton text='Valider' loading={loading} centered />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Formsy>
        </div>
    )
};

const mapStateToProps = ({goalAdviceListCreation}) => ({
    goalAdviceListCreation
});

const mapDispatchToProps = (dispatch) => ({
    goalAdviceListCreationActions : bindActionCreators(goalAdviceListCreationActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdviceList)
