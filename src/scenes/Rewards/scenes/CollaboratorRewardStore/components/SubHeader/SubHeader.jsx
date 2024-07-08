import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Loader,
  RoundedTab,
  RoundedTabs,
  UserProfile,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';

const style = {
  root: {
    padding: 16,
  },
};

const SubHeader = ({ page, onChange, ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  const { collaborator, loading: collaboratorDetailLoading } =
    props.collaboratorDetail;
  const { configs, loading: configListLoading } = props.configList;
  const [value, setValue] = React.useState(page);
  const collaboratorRewardActivation = configs
    ? configs.find((x) => x.code === 'CRWA').value.toBoolean()
    : null;
  const teamRewardActivation = configs
    ? configs.find((x) => x.code === 'TRWA').value.toBoolean()
    : null;
  const loading = collaboratorDetailLoading || configListLoading;

  function handleChange(e, value) {
    setValue(value);
    onChange(value);
  }

  const renderLoader = () => {
    return (
      <div className={classes.root}>
        <Loader centered />
      </div>
    );
  };

  const renderData = () => {
    return (
      <div>
        <UserProfile user={collaborator} />
        {teamRewardActivation && (
          <RoundedTabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
          >
            {collaboratorRewardActivation && (
              <RoundedTab
                label={intl.formatMessage({ id: 'ranking.collaborator_tab' })}
              />
            )}
            {teamRewardActivation && (
              <RoundedTab
                label={intl.formatMessage({ id: 'ranking.team_tab' })}
              />
            )}
          </RoundedTabs>
        )}
      </div>
    );
  };

  return (
    <div>
      {loading && renderLoader()}
      {!loading && collaborator && configs && renderData()}
    </div>
  );
};

const mapStateToProps = ({ collaboratorDetail, configList }) => ({
  collaboratorDetail,
  configList,
});

export default connect(mapStateToProps)(withStyles(style)(SubHeader));
