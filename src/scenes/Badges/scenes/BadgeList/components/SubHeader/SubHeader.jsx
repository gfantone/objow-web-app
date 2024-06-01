import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Loader,
  RoundedTabs,
  RoundedTab,
  UserProfile,
} from '../../../../../../components';
import { useIntl } from 'react-intl';

const styles = {
  root: {
    padding: 16,
  },
};

const SubHeader = ({ initial = true, ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  const { collaborator, loading } = props.collaboratorDetail;
  const { onChange } = props;
  const [value, setValue] = React.useState(initial ? 0 : 1);

  function handleChange(e, value) {
    const current = value == 0;
    setValue(value);
    onChange(current);
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
        <RoundedTabs value={value} onChange={handleChange} variant="fullWidth">
          <RoundedTab
            label={intl.formatMessage({ id: 'badge.list.current_tab' })}
          />
          <RoundedTab
            label={intl.formatMessage({ id: 'badge.list.completed_tab' })}
          />
        </RoundedTabs>
      </div>
    );
  };

  return (
    <div>
      {loading && renderLoader()}
      {!loading && collaborator && renderData()}
    </div>
  );
};

const mapStateToProps = ({
  collaboratorBadgeLevelList,
  collaboratorDetail,
}) => ({
  collaboratorBadgeLevelList,
  collaboratorDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader));
