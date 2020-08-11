import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Goal } from '../../../../components'
import { Loader, RoundedTab, RoundedTabs } from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import '../../../../../../helpers/NumberHelper'

const styles = {
    root: {
        padding: 16
    }
};

const SubHeader = ({ activateRank, onChange, ...props }) => {
    const { classes } = props;
    const { account } = props.accountDetail;
    const { goal, loading: teamCollaboratorGoalDetailLoading } = props.teamCollaboratorGoalDetail;
    const { loading: collaboratorGoalRankListLoading } = props.collaboratorGoalRankList;
    const loading = teamCollaboratorGoalDetailLoading || collaboratorGoalRankListLoading;
    const [value, setValue] = React.useState(0);

    const handleChange = (e, value) => {
        setValue(value);
        if (onChange) onChange(value)
    };

    const renderLoader = () => {
        return <Loader centered />
    };

    const renderData = () => {
        return <Goal goal={goal} />
    };

    return (
        <div>
            <div className={classes.root}>
                { loading && renderLoader() }
                { !loading && goal && renderData() }
            </div>
            { activateRank && <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                <RoundedTab label={Resources.TEAM_COLLABORATOR_GOAL_DETAIL_RANK_TAB} />
                <RoundedTab label={Resources.TEAM_COLLABORATOR_GOAL_DETAIL_INDICATION_TAB} />
                { goal && goal.editable && goal.end.toDate() >= new Date() && account.role.code !== 'C' && <RoundedTab label={Resources.TEAM_COLLABORATOR_GOAL_DETAIL_EDIT_TAB} /> }
            </RoundedTabs> }
        </div>
    )
};

const mapStateToProps = ({ accountDetail, collaboratorGoalRankList, teamCollaboratorGoalDetail }) => ({
    accountDetail,
    collaboratorGoalRankList,
    teamCollaboratorGoalDetail
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader))
