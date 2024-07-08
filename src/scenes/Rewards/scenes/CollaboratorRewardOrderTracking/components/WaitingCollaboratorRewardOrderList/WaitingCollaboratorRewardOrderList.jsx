import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DataTable, Loader } from '../../../../../../components';
import { useIntl } from 'react-intl';
import * as Resources from '../../../../../../Resources';
import * as collaboratorRewardOrderSummaryListActions from '../../../../../../services/CollaboratorRewardOrderSummaries/CollaboratorRewardOrderSummaryList/actions';

const WaitingCollaboratorRewardOrderList = ({ ...props }) => {
  const intl = useIntl();
  const { orders, loading } = props.collaboratorRewardOrderSummaryList;
  const columns = [
    {
      name: 'id',
      label: intl.formatMessage({
        id: 'collaborator.reward_order.tracking.id_column',
      }),
    },
    {
      name: 'name',
      label: intl.formatMessage({
        id: 'collaborator.reward_order.tracking.name_column',
      }),
    },
    {
      name: 'email',
      label: intl.formatMessage({
        id: 'collaborator.reward_order.tracking.email_column',
      }),
    },
    {
      name: 'team',
      label: intl.formatMessage({
        id: 'collaborator.reward_order.tracking.team_column',
      }),
    },
    {
      name: 'points',
      label: intl.formatMessage({
        id: 'collaborator.reward_order.tracking.waiting_points_column',
      }),
    },
    {
      name: 'value',
      label: intl.formatMessage({
        id: 'collaborator.reward_order.tracking.value_column',
      }),
      options: {
        customBodyRender: (value) => {
          return <span>{value} €</span>;
        },
      },
    },
    {
      name: 'orderDate',
      label: intl.formatMessage({
        id: 'collaborator.reward_order.tracking.order_date_column',
      }),
      options: {
        customBodyRender: (value) => {
          return <span>{value ? value.toDate().toLocaleString() : ''}</span>;
        },
        filter: false,
      },
    },
  ];
  const options = {
    selectableRows: 'none',
    onRowClick: (colData, cellMeta) => {
      props.history.push(
        `/rewards/collaborator-orders/${colData[0]}/validation`,
      );
    },
  };

  useEffect(() => {
    props.collaboratorRewardOrderSummaryListActions.getWaitingCollaboratorRewardOrderSummaryList();
  }, []);

  function renderLoader() {
    return <Loader centered />;
  }

  function renderData() {
    return <DataTable data={orders} columns={columns} options={options} />;
  }

  return (
    <div>
      {loading && renderLoader()}
      {!loading && orders && renderData()}
    </div>
  );
};

const mapStateToProps = ({ collaboratorRewardOrderSummaryList }) => ({
  collaboratorRewardOrderSummaryList,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorRewardOrderSummaryListActions: bindActionCreators(
    collaboratorRewardOrderSummaryListActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(WaitingCollaboratorRewardOrderList));
