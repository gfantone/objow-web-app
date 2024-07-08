import React, { useEffect } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Goal } from './components';
import {
  DefaultTitle,
  IconButton as MenuIconButton,
  Card,
  DefaultText,
} from '../../../../../../components';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import { uuidv4 } from '../../../../../../helpers/UUIDHelper';

const styles = (theme) => {
  return {
    actveColore: {
      color: theme.palette.primary.main,
    },
  };
};

const Goals = ({
  categories,
  goals,
  kpis,
  units,
  challengeTypeCode,
  goalAdding,
  onGoalAdded,
  addGoal,
  setNewKpiOpen,
  awardType,
  classes,
  ...props
}) => {
  const intl = useIntl();
  const [currentGoals, setCurrentGoals] = React.useState(
    goals
      ? goals.map((x) => ({
          key: uuidv4(),
          category: x.kpi.category ? x.kpi.category.id : null,
          kpi: x.kpi.id,
          goalName: x.name,
          goalDescription: x.description,
          target: x.target,
          points: x.points,
          kpiObject: x.kpi,
          collaboratorEditable: x.kpi.collaborator_editable,
        }))
      : [
          {
            key: uuidv4(),
            category: null,
            kpi: null,
            goalName: null,
            target: null,
            points: null,
          },
        ]
  );
  const deletionDisabled = currentGoals.length === 1;

  useEffect(() => {
    if (goalAdding) {
      setCurrentGoals((goals) => [
        ...goals,
        {
          key: uuidv4(),
          category: null,
          kpi: null,
          goalName: null,
          target: null,
          points: null,
          isNew: true,
        },
      ]);
      onGoalAdded();
    }
  }, [goalAdding]);

  function handleRemoveGoalClick(key) {
    setCurrentGoals((x) => x.filter((y) => y.key != key));
  }
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <DefaultTitle isContrast>
                {intl.formatMessage({ id: 'challenge.form.goal_area' })}
              </DefaultTitle>
            </Grid>
            <Grid item>
              <DefaultTitle>
                <MenuIconButton
                  size={'small'}
                  onClick={() => setNewKpiOpen(true)}
                  style={{ marginTop: '-2px', color: '#555', fontSize: '18px' }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className={classes.actveColore}
                  />
                </MenuIconButton>
              </DefaultTitle>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item container spacing={2}>
            {currentGoals.map((goal, index) => {
              return (
                <Goal
                  key={goal.key}
                  categories={categories}
                  challengeTypeCode={challengeTypeCode}
                  deletionDisabled={deletionDisabled}
                  goal={goal}
                  index={index}
                  kpis={kpis}
                  units={units}
                  onRemoveClick={() => handleRemoveGoalClick(goal.key)}
                  awardType={awardType}
                />
              );
            })}
            <Grid item xs={12} sm={6}>
              <div onClick={addGoal} style={{ cursor: 'pointer' }}>
                <Card>
                  <DefaultText
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                    }}
                    className={classes.actveColore}
                    lowercase
                  >
                    {intl.formatMessage({
                      id: 'challenge.form.goals.add_button',
                    })}
                  </DefaultText>
                </Card>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Goals);
