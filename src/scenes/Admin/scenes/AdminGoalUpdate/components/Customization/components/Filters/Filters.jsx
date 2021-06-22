import React from 'react'
import { connect } from 'react-redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { Card, QuarterFilter, MonthFilter, Select, SemesterFilter, WeekFilter, YearFilter } from '../../../../../../../../components'

const Filters = ({ onDateChange, onTeamChange, displayDateFilter, emptyDisabledTeam, ...props }) => {
    const { definition } = props.goalDefinitionDetail;
    const { teams } = props.teamList;
    const activateTeamFilter = definition.type.code == 'C';
    const [initialized, setInitialized] = React.useState(false);

    if (!initialized && definition.periodicity.code == 'Y') {
        const now = new Date();
        const date = new Date(Date.UTC(now.getFullYear(), 0, 1));
        setInitialized(true);
        onDateChange(date)
    }

    const handleDateChange = value => {
        onDateChange(value)
    };

    const handleTeamChange = newValue => {
        const value = newValue > 0 ? newValue : null;
        onTeamChange(value)
    };

    return (
        <div>
            <Formsy>
                <Card>
                    <Grid container spacing={2}>
                        { definition.periodicity.code != 'Y' && displayDateFilter && <Grid item xs={6}>
                            { definition.periodicity.code == 'W' && <WeekFilter pastPeriods onChange={handleDateChange} /> }
                            { definition.periodicity.code == 'M' && <MonthFilter pastPeriods onChange={handleDateChange} /> }
                            { definition.periodicity.code == 'Q' && <QuarterFilter pastPeriods onChange={handleDateChange} /> }
                            { definition.periodicity.code == 'S' && <SemesterFilter pastPeriods onChange={handleDateChange} /> }
                        </Grid> }
                        { activateTeamFilter && <Grid item xs={6}>
                            <Select name='team' label='Équipe' options={teams} optionValueName='id'  optionTextName='name' emptyDisabled={ emptyDisabledTeam } emptyValue='-1' emptyText='Toutes les équipes' onChange={handleTeamChange} fullWidth />
                        </Grid> }
                    </Grid>
                </Card>
            </Formsy>
        </div>
    )
};

const mapStateToProps = ({ goalDefinitionDetail, teamList }) => ({
    goalDefinitionDetail,
    teamList
});

export default connect(mapStateToProps)(Filters)
