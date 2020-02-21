import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Challenge } from '../../../../components'
import { Loader, RoundedTab, RoundedTabs } from '../../../../../../components'

const styles = {
    loaderContainer: {
        padding: 16
    },
    challengeContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16
    }
};

const SubHeader = ({ activateRank, onChange, ...props }) => {
    const { classes } = props;
    const [value, setValue] = React.useState(0);
    var { challenge, loading: teamChallengeDetailLoading } = props.teamChallengeDetail;
    const { loading: teamChallengeGoalListLoading } = props.teamChallengeGoalList;
    const { loading: teamChallengeRankListLoading } = props.teamChallengeRankList;
    const loading = teamChallengeDetailLoading || teamChallengeGoalListLoading || teamChallengeRankListLoading;

    const handleChange = (e, value) => {
        setValue(value);
        if (onChange) onChange(value)
    };

    const renderLoader = () => {
        return (
            <div className={classes.loaderContainer}>
                <Loader centered />
            </div>
        )
    };

    const renderData = () => {
        return (
            <div>
                <div className={classes.challengeContainer}>
                    <Challenge challenge={challenge} />
                </div>
                { activateRank && <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                    <RoundedTab label='Classements' />
                    <RoundedTab label='Conditions' />
                </RoundedTabs> }
            </div>
        )
    };

    return (
        <div>
            { loading && renderLoader() }
            { !loading && challenge && renderData() }
        </div>
    )
};

const mapStateToProps = ({ teamChallengeDetail, teamChallengeGoalList, teamChallengeRankList }) => ({
    teamChallengeDetail,
    teamChallengeGoalList,
    teamChallengeRankList
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader))