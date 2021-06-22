import React from 'react'
import { Select } from '../../..'
import '../../../../../../../../helpers/DateHelper'
import {connect} from "react-redux";

const QuarterFilter = ({ onChange, pastPeriods, ...props }) => {
    const getQuarters = () => {
        const today = new Date();
        const { goals } = props.goalList;
        const quarters = [];
        if (goals) {
            for (var i = 0; i < goals.length; i++) {
                const goal = goals[i];
                const date = goal.start.toDate();
                if (pastPeriods || ((goal.start.toDate() <= today && today <= goal.end.toDate()) || goal.start.toDate() >= today)) {
                    quarters.push({name: `Trimestre ${date.getQuarterNumber()}`, date: date})
                }
            }
        }
        return quarters
    };

    const quarters = getQuarters();

    const handleChange = (value) => {
        const date = !isNaN(Date.parse(value)) ? new Date(value) : null;
        if (onChange) onChange(date)
    };

    return (
        <div>
            <Select name='quarter' label='Trimestre' options={quarters} optionValueName='date' optionTextName='name' emptyText='Tous les trimestres' onChange={handleChange} fullWidth />
        </div>
    )
};

const mapStateToProps = ({ goalList }) => ({
    goalList
});

export default connect(mapStateToProps)(QuarterFilter)
