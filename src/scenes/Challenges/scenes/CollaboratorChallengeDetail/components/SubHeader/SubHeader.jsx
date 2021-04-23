import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Challenge, ChallengeSimple } from '../../../../components'
import { Loader, RoundedTab, RoundedTabs } from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

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
    var { challenge, loading: collaboratorChallengeDetailLoading } = props.collaboratorChallengeDetail;
    const { loading: collaboratorChallengeRankListLoading } = props.collaboratorChallengeRankList;
    const loading = collaboratorChallengeDetailLoading || collaboratorChallengeRankListLoading;

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
                    <ChallengeSimple challenge={challenge} />
                </div>
                { activateRank && <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                    <RoundedTab label={Resources.COLLABORATOR_CHALLENGE_DETAIL_RANK_TAB} />
                    <RoundedTab label={Resources.COLLABORATOR_CHALLENGE_DETAIL_CONDITION_TAB} />
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

const mapStateToProps = ({ collaboratorChallengeDetail, collaboratorChallengeRankList }) => ({
    collaboratorChallengeDetail,
    collaboratorChallengeRankList
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader))
