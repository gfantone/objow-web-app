import React from 'react';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import {
  Card,
  QuarterFilter,
  MonthFilter,
  Select,
  SemesterFilter,
  WeekFilter,
  YearFilter,
  CustomFilter,
} from '../../../../../../../../components';
import { useIntl } from 'react-intl';

const Filters = ({
  onDateChange,
  onTeamChange,
  displayDateFilter,
  emptyDisabledTeam,
  defaultDate,
  loading,
  defaultTeam,
  kpi,
  ...props
}) => {
  const intl = useIntl();
  const { definition } = props.goalDefinitionDetail;
  const { teams } = props.teamList;
  const activateTeamFilter = definition.type.code == 'C';
  const [initialized, setInitialized] = React.useState(false);

  if (!initialized && definition.periodicity.code == 'Y') {
    const now = new Date();
    const date = new Date(Date.UTC(now.getFullYear(), 0, 1));
    setInitialized(true);
    onDateChange(date);
  }

  const handleDateChange = (value) => {
    onDateChange(value);
  };

  const handleTeamChange = (newValue) => {
    const value = newValue > 0 ? newValue : null;
    onTeamChange(value);
  };

  return (
    <div>
      <Formsy>
        <Card>
          <Grid container spacing={2}>
            {definition.periodicity.code != 'Y' && displayDateFilter && (
              <Grid item xs={6}>
                {definition.periodicity.code == 'W' && (
                  <WeekFilter
                    pastPeriods
                    defaultDate={defaultDate}
                    onChange={handleDateChange}
                  />
                )}
                {definition.periodicity.code == 'M' && (
                  <MonthFilter
                    pastPeriods
                    defaultDate={defaultDate}
                    onChange={handleDateChange}
                  />
                )}
                {definition.periodicity.code == 'Q' && (
                  <QuarterFilter
                    pastPeriods
                    defaultDate={defaultDate}
                    onChange={handleDateChange}
                  />
                )}
                {definition.periodicity.code == 'S' && (
                  <SemesterFilter
                    pastPeriods
                    defaultDate={defaultDate}
                    onChange={handleDateChange}
                  />
                )}
                {definition.periodicity.code == 'C' && (
                  <Select
                    name="period"
                    label={intl.formatMessage({
                      id: 'admin.goal.kpi_period_label',
                    })}
                    initial={defaultDate ? defaultDate : null}
                    options={kpi.periods.map((period, index) => ({
                      date: period.start,
                      name: intl
                        .formatMessage({ id: 'admin.goal.period_label_long' })
                        .format(
                          index + 1,
                          period.start.toDate2().toLocaleDateString(),
                          period.end.toDate2().toLocaleDateString(),
                        ),
                    }))}
                    optionValueName="date"
                    optionTextName="name"
                    emptyText={intl.formatMessage({
                      id: 'filter.all_periods_label',
                    })}
                    onChange={(start) =>
                      handleDateChange(new Date(start * 1000))
                    }
                    fullWidth
                  />
                )}
              </Grid>
            )}
            {activateTeamFilter && (
              <Grid item xs={6}>
                <Select
                  name="team"
                  disabled={loading}
                  label="Équipe"
                  options={teams}
                  optionValueName="id"
                  optionTextName="name"
                  emptyDisabled={emptyDisabledTeam}
                  emptyValue="-1"
                  emptyText="Toutes les équipes"
                  onChange={handleTeamChange}
                  initial={defaultTeam}
                  updateInitial
                  fullWidth
                />
              </Grid>
            )}
          </Grid>
        </Card>
      </Formsy>
    </div>
  );
};

const mapStateToProps = ({ goalDefinitionDetail, teamList }) => ({
  goalDefinitionDetail,
  teamList,
});

export default connect(mapStateToProps)(Filters);
