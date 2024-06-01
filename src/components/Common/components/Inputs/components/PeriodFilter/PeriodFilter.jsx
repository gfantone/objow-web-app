import React from 'react';
import {
  QuarterFilter,
  MonthFilter,
  SemesterFilter,
  WeekFilter,
  YearFilter,
} from './components';
import { Select } from '..';

const weekPeriod = { id: '1', name: 'Semaine' };
const monthPeriod = { id: '2', name: 'Mois' };
const quarterPeriod = { id: '3', name: 'Trimestre' };
const semesterPeriod = { id: '4', name: 'Semestre' };
const yearPeriod = { id: '5', name: 'Année' };

const periods = [
  weekPeriod,
  monthPeriod,
  quarterPeriod,
  semesterPeriod,
  yearPeriod,
];

const PeriodFilter = ({}) => {
  const [period, setPeriod] = React.useState('');

  return (
    <div>
      <Select
        name="period"
        label="Période"
        value={period}
        onChange={setPeriod}
        options={periods}
        optionValueName="id"
        optionTextName="name"
      />
      {period == weekPeriod.id && <WeekFilter />}
      {period == monthPeriod.id && <MonthFilter />}
      {period == quarterPeriod.id && <QuarterFilter />}
      {period == semesterPeriod.id && <SemesterFilter />}
      {period == yearPeriod.id && <YearFilter />}
    </div>
  );
};

export default PeriodFilter;
