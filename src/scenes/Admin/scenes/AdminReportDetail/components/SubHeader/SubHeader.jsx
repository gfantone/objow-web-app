import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import { DefaultText, Loader } from '../../../../../../components';

const styles = {
  root: {
    padding: 16,
  },
};

const SubHeader = ({ ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  const { loading: collaboratorDataListLoading } = props.collaboratorDataList;
  const { kpi, loading: kpiDetailLoading } = props.kpiDetail;
  const loading = collaboratorDataListLoading || kpiDetailLoading;

  const renderLoader = () => {
    return <Loader centered />;
  };

  const renderData = () => {
    const { kpi } = props.kpiDetail;

    return (
      <DefaultText align="center">
        {intl
          .formatMessage({ id: 'admin.report_details.title' })
          .format(kpi.name)}
      </DefaultText>
    );
  };

  return (
    <div className={classes.root}>
      {loading && renderLoader()}
      {!loading && kpi && renderData()}
    </div>
  );
};

const mapStateToProps = ({ collaboratorDataList, kpiDetail }) => ({
  collaboratorDataList,
  kpiDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader));
