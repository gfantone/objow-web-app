import React from 'react';
import { Select } from '../../..';
import '../../../../../../../../helpers/DateHelper';
import { connect } from 'react-redux';

const SemesterFilter = ({ onChange, pastPeriods, defaultDate, ...props }) => {
  const getSemesters = () => {
    const today = new Date();
    const { goals } = props.goalList;
    const semesters = [];
    if (goals) {
      for (var i = 0; i < goals.length; i++) {
        const goal = goals[i];
        const date = goal.start.toDate();
        if (
          pastPeriods ||
          (goal.start.toDate() <= today && today <= goal.end.toDate()) ||
          goal.start.toDate() >= today
        ) {
          semesters.push({
            name: `Semestre ${date.getSemesterNumber()}`,
            date: date,
          });
        }
      }
    }
    return semesters;
  };

  const semesters = getSemesters();

  const handleChange = (value) => {
    const date = !isNaN(Date.parse(value)) ? new Date(value) : null;
    if (onChange) onChange(date);
  };

  return (
    <div>
      <Select
        name="semester"
        label="Semestre"
        initial={defaultDate ? defaultDate : null}
        options={semesters}
        optionValueName="date"
        optionTextName="name"
        emptyText="Tous les semestres"
        onChange={handleChange}
        fullWidth
      />
    </div>
  );
};

const mapStateToProps = ({ goalList }) => ({
  goalList,
});

export default connect(mapStateToProps)(SemesterFilter);
