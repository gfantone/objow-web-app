import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  DefaultTitle,
  ProgressButton,
  TableChip,
  TextField,
  RichTextField,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { uuidv4 } from '../../../../../../helpers/UUIDHelper';
import * as goalAdviceListCreationActions from '../../../../../../services/GoalAdvices/GoalAdviceListCreation/actions';
import { toast } from 'react-toastify';

const styles = (theme) => {
  return {
    coachingItem: {
      '& .rich-text > div': {
        backgroundColor: 'transparent !important',
        borderBottom: '1px solid #333',
        fontSize: '15px',
      },
      '& label.MuiFormLabel-root': {
        fontSize: '16px !important',
      },
    },
    colorIcon: {
      color: theme.palette.primary.main,
    },
  };
};

const AdviceList = ({ advices, goal, type, classes, ...props }) => {
  const intl = useIntl();
  const [newAdvices, setNewAdvices] = React.useState(
    advices.map((x) => ({ key: uuidv4(), text: x.text }))
  );
  const { loading, success } = props.goalAdviceListCreation;

  const onAdd = () => {
    setNewAdvices((newAdvices) =>
      newAdvices.concat([
        {
          key: uuidv4(),
          text: JSON.stringify([{ children: [{ text: '' }] }]),
        },
      ])
    );
  };

  const onRemove = (key) => {
    setNewAdvices((newAdvices) => newAdvices.filter((x) => x.key != key));
  };

  const onSubmit = (model) => {
    const advices = model.advices
      ? model.advices.map((x) => ({
          text: JSON.stringify(x),
          goal: goal.goalId,
          team: goal.teamId,
        }))
      : [];

    switch (type) {
      case 'C':
        props.goalAdviceListCreationActions.createGoalAdviceListByCollaboratorGoal(
          advices,
          goal.id
        );
        break;
      case 'TC':
        props.goalAdviceListCreationActions.createGoalAdviceListByTeamCollaboratorGoal(
          advices,
          goal.id
        );
        break;
      case 'T':
        props.goalAdviceListCreationActions.createGoalAdviceListByTeamGoal(
          advices,
          goal.id
        );
        break;
    }
  };

  if (success) {
    props.goalAdviceListCreationActions.clearGoalAdviceListCreation();
    toast.success(intl.formatMessage({ id: 'common.update_success_message' }));
  }

  return (
    <div>
      <Formsy onValidSubmit={onSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <DefaultTitle isContrast style={{ marginTop: 2 }}>
                  {intl.formatMessage({
                    id: 'admin.goal.indication.coaching_area',
                  })}
                </DefaultTitle>
              </Grid>
              <Grid item>
                <IconButton size='small' onClick={onAdd}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className={classes.colorIcon}
                  />
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
                        <Grid item xs className={classes.coachingItem}>
                          <RichTextField
                            name={`advices[${index}]`}
                            initial={JSON.parse(advice.text)}
                            readOnly={false}
                            label={intl
                              .formatMessage({
                                id: 'admin.goal.indication.coaching_item_label',
                              })
                              .format(index + 1)}
                            fullWidth
                            multiline
                            required
                          />
                        </Grid>
                        <Grid item>
                          <IconButton
                            size='small'
                            style={{ marginTop: 4 }}
                            onClick={() => onRemove(advice.key)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid item xs={12}>
                  <ProgressButton
                    text={intl.formatMessage({ id: 'common.submit' })}
                    loading={loading}
                    centered
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Formsy>
    </div>
  );
};

const mapStateToProps = ({ goalAdviceListCreation }) => ({
  goalAdviceListCreation,
});

const mapDispatchToProps = (dispatch) => ({
  goalAdviceListCreationActions: bindActionCreators(
    goalAdviceListCreationActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AdviceList));
