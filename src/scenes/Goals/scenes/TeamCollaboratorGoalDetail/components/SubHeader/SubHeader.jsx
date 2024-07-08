import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Goal, GoalJti } from '../../../../components';
import { Loader, RoundedTab, RoundedTabs } from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import '../../../../../../helpers/NumberHelper';
import { useIntl } from 'react-intl';

const styles = {
  root: {
    padding: 16,
  },
};

const SubHeader = ({ activateRank, onChange, ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  const { account } = props.accountDetail;
  const isJti = account.isJtiEnv;
  const { goal, loading: teamCollaboratorGoalDetailLoading } =
    props.teamCollaboratorGoalDetail;
  const { loading: collaboratorGoalRankListLoading } =
    props.collaboratorGoalRankList;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      !teamCollaboratorGoalDetailLoading &&
      !collaboratorGoalRankListLoading
    ) {
      setLoading(false);
    }
  }, [teamCollaboratorGoalDetailLoading, collaboratorGoalRankListLoading]);

  const [value, setValue] = useState(0);

  const handleChange = (e, value) => {
    setValue(value);
    if (onChange) onChange(value);
  };

  const renderLoader = () => {
    return <Loader centered />;
  };

  const renderData = () => {
    if (isJti) {
      return <GoalJti goal={goal} />;
    }
    return <Goal goal={goal} />;
  };

  const editable =
    goal && // Admin and manager on solo goals
    ((goal.editable && account.role.code !== 'C') ||
      // Admin on team goals
      (goal && account.role.code === 'A'));
  return (
    <div>
      <div className={classes.root}>
        {loading && renderLoader()}
        {!loading && goal && renderData()}
      </div>
      <RoundedTabs
        value={!activateRank && value === 0 ? 1 : value}
        onChange={handleChange}
        variant='fullWidth'
      >
        {activateRank && (
          <RoundedTab
            value={0}
            label={intl.formatMessage({ id: 'admin.goal.detail.rank_tab' })}
          />
        )}
        <RoundedTab
          value={1}
          label={intl.formatMessage({ id: 'admin.goal.detail.indication_tab' })}
        />
        {editable && (
          <RoundedTab
            value={2}
            label={intl.formatMessage({ id: 'common.edit' })}
          />
        )}
      </RoundedTabs>
    </div>
  );
};

const mapStateToProps = ({
  accountDetail,
  collaboratorGoalRankList,
  teamCollaboratorGoalDetail,
}) => ({
  accountDetail,
  collaboratorGoalRankList,
  teamCollaboratorGoalDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader));
