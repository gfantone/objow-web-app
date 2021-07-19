import _ from 'lodash'

const getPeriodByGoal = (goal) => {
  if(!goal) {
    return {
      name: '',
      date: ''
    }
  }
  const definition= goal.definition
  const periodicity = _.get(definition, 'periodicity.code')
  if(periodicity === 'W') {
    return getWeekByGoal(goal)
  }
  if(periodicity === 'M') {
    return getMonthByGoal(goal)
  }
  if(periodicity === 'Q') {
    return getQuarterByGoal(goal)
  }
  if(periodicity === 'S') {
    return getSemesterByGoal(goal)
  }
  if(periodicity === 'Y') {
    return getYearByGoal(goal)
  }
}

const getWeekByGoal = (goal) => {
  const date = goal.start.toDate();
  return {name: `Semaine ${date.getWeekNumber()}`, date: date}
}

const getMonthByGoal = (goal) => {
  const date = goal.start.toDate();
  return {name: Intl.DateTimeFormat('fr-FR', {month: 'long'}).format(date), date: date}
};

const getQuarterByGoal = (goal) => {
  const date = goal.start.toDate();
  return {name: `Trimestre ${date.getQuarterNumber()}`, date: date}
}

const getSemesterByGoal = (goal) => {
  const date = goal.start.toDate();
  return {name: `Semestre ${date.getSemesterNumber()}`, date: date}
}

const getYearByGoal = (goal) => {
  const date = goal.start.toDate();

  return { name: date.getFullYear(), date: date }
}

export default getPeriodByGoal;
