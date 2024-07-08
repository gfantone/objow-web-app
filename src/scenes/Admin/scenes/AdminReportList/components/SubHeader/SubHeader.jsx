import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import {
  DefaultText,
  Loader,
  RoundedTabs,
  RoundedTab,
  AppBarSubTitle,
} from '../../../../../../components';

const styles = {};

const SubHeader = ({ ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  const [tabValue, setTabValue] = React.useState(0);
  const { configs, loading } = props.configList;

  const renderLoader = () => {
    return <Loader centered />;
  };

  const handleChangeTab = (event, value) => {
    props.handleChangeTab(value);
    setTabValue(value);
  };

  const renderData = () => {
    const MTBS = configs && configs.find((c) => c.code === 'MTBS');

    if (!MTBS || !MTBS.value) {
      return (
        <AppBarSubTitle
          title={intl.formatMessage({ id: 'admin.report.title' })}
        />
      );
    }

    return (
      <RoundedTabs
        onChange={handleChangeTab}
        variant="fullWidth"
        value={tabValue}
      >
        <RoundedTab
          label={intl.formatMessage({ id: 'admin.report.list_tab' })}
        />
        {MTBS && (
          <RoundedTab
            label={intl.formatMessage({ id: 'admin.report.dashboard_tab' })}
          />
        )}
      </RoundedTabs>
    );
  };

  return (
    <div className={classes.root}>
      {loading && renderLoader()}
      {!loading && configs && renderData()}
    </div>
  );
};

const mapStateToProps = ({ configList }) => ({
  configList,
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader));
