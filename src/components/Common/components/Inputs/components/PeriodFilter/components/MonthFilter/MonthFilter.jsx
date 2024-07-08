import React from 'react';
import { Select } from '../../..';
import { connect } from 'react-redux';

const MonthFilter = ({ onChange, pastPeriods, defaultDate, ...props }) => {
  const getMonths = () => {
    const today = new Date();
    const { goals } = props.goalList;
    const months = [];

    if (goals) {
      for (var i = 0; i < goals.length; i++) {
        const goal = goals[i];
        const date = goal.start.toDate();
        if (
          pastPeriods ||
          (goal.start.toDate() <= today && today <= goal.end.toDate()) ||
          goal.start.toDate() >= today
        ) {
          months.push({
            name: Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date),
            date: date,
          });
        }
      }
    }
    return months;
  };

  const months = getMonths();

  const handleChange = (value) => {
    const date = !isNaN(Date.parse(value)) ? new Date(value) : null;
    if (onChange) onChange(date);
  };
  return (
    <div>
      <Select
        name="month"
        label="Mois"
        initial={defaultDate ? defaultDate : null}
        options={months}
        optionValueName="date"
        optionTextName="name"
        emptyText="Tous les mois"
        onChange={handleChange}
        fullWidth
      />
    </div>
  );
};

const mapStateToProps = ({ goalList }) => ({
  goalList,
});

export default connect(mapStateToProps)(MonthFilter);
