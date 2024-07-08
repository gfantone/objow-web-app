import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Goal } from './components';
import {
  DefaultTitle,
  DatePicker,
  Card,
  IconButton as MenuIconButton,
  DefaultText,
} from '../../../../../../components';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import * as Resources from '../../../../../../Resources';
import { uuidv4 } from '../../../../../../helpers/UUIDHelper';

const Goals = ({
  categories,
  goals,
  kpis,
  challengeTypeCode,
  goalAdding,
  onGoalAdded,
  onEndChange,
  onStartChange,
  start,
  end,
  period,
  handleAddGoal,
  setNewKpiOpen,
  awardType,
  units,
  ...props
}) => {
  const intl = useIntl();

  const [currentGoals, setCurrentGoals] = React.useState(
    goals
      ? goals.map((x) => ({
          key: uuidv4(),
          category: x.kpi && x.kpi.category ? x.kpi.category.id : null,
          kpi: x.kpi,
          goalName: x.name,
          goalDescription: x.description,
          target: x.target,
          points: x.points,
          custom: x.custom,
          collaboratorEditable: x.collaboratorEditable,
          unit: x.unit,
        }))
      : [
          {
            key: uuidv4(),
            category: null,
            kpi: null,
            goalName: null,
            target: null,
            points: null,
            custom: false,
          },
        ]
  );

  const deletionDisabled = currentGoals.length === 1;

  const today = new Date();
  const startMinDate = new Date(today.getFullYear(), 0, 1);
  const startMaxDate = end ? end : period.end.toDate2();
  const endMinDate = start ? start : today;

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
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <Card>
            <Grid container spacing={2} justify='center' direction='row'>
              <Grid item xs={6} sm={3}>
                <DatePicker
                  clearable
                  format='dd/MM/yyyy'
                  fullWidth
                  initial={start}
                  label={intl.formatMessage({
                    id: 'challenge.form.info_start_label',
                  })}
                  maxDate={startMaxDate}
                  minDate={startMinDate}
                  name='start'
                  required
                  validationErrors={{
                    isDefaultRequiredValue: intl.formatMessage({
                      id: 'common.form.required_error',
                    }),
                  }}
                  onChange={onStartChange}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DatePicker
                  clearable
                  format='dd/MM/yyyy'
                  fullWidth
                  initial={end}
                  label={intl.formatMessage({
                    id: 'challenge.form.info_end_label',
                  })}
                  maxDate={period.end.toDate2()}
                  minDate={endMinDate}
                  name='end'
                  required
                  validationErrors={{
                    isDefaultRequiredValue: intl.formatMessage({
                      id: 'common.form.required_error',
                    }),
                  }}
                  onChange={onEndChange}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {start && end && (
          <Grid item>
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
                        style={{
                          marginTop: '-2px',
                          color: '#555',
                          fontSize: '18px',
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ color: '#00E58D' }}
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
                        deletionDisabled={deletionDisabled}
                        challengeTypeCode={challengeTypeCode}
                        goal={goal}
                        index={index}
                        kpis={kpis}
                        units={units}
                        onRemoveClick={() => handleRemoveGoalClick(goal.key)}
                        setNewKpiOpen={setNewKpiOpen}
                        awardType={awardType}
                      />
                    );
                  })}
                  <Grid item xs={12} sm={6}>
                    <div onClick={handleAddGoal} style={{ cursor: 'pointer' }}>
                      <Card>
                        <DefaultText
                          style={{
                            textAlign: 'center',
                            fontSize: 15,
                            color: '#00E58D',
                          }}
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
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Goals;
