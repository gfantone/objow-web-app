import React from 'react'
import { connect } from 'react-redux'
import { Select } from '../../..'
import { getWeeksOfYear } from '../../../../../../../../helpers/DateHelper'
import '../../../../../../../../helpers/DateHelper'
import '../../../../../../../../helpers/NumberHelper'

var weeks = [];
const max = getWeeksOfYear();
for (var i = 0; i < max; i++) {
    const number = i + 1;
    weeks.push({ number: number, name: `Semaine ${number}` })
}

const WeekFilter = ({ onChange, pastPeriods, ...props }) => {
    const getWeeks = () => {
        const today = new Date();
        const { goals } = props.goalList;
        const weeks = [];
        if (goals) {
            for (var i = 0; i < goals.length; i++) {
                const goal = goals[i];
                const date = goal.start.toDate();
                if (pastPeriods || ((goal.start.toDate() <= today && today <= goal.end.toDate()) || goal.start.toDate() >= today)) {
                    weeks.push({name: `Semaine ${date.getWeekNumber()}`, date: date})
                }
            }
        }
        return weeks
    };

    const weeks = getWeeks();

    const handleChange = (value) => {
        const date = !isNaN(Date.parse(value)) ? new Date(value) : null;
        if (onChange) onChange(date)
    };

    return (
        <div>
            <Select name='week' label='Semaine' options={weeks} optionValueName='date' optionTextName='name' emptyText='Toutes les semaines' onChange={handleChange} fullWidth />
        </div>
    )
};

const mapStateToProps = ({ goalList }) => ({
    goalList
});

export default connect(mapStateToProps)(WeekFilter)
