import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ValidatedCollaboratorRewardOrderList,
  WaitingCollaboratorRewardOrderList,
  PendingCollaboratorRewardOrderList,
} from './components';
import { RewardOrderListExport, TrackingSubHeader } from '../../components';
import {
  IconButton as AppBarIconButton,
  MainLayoutComponent,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import * as configListActions from '../../../../services/Configs/ConfigList/actions';
import { injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

class CollaboratorRewardOrderTracking extends MainLayoutComponent {
  state = { exportOpen: false, page: 0, initialized: false };

  handleAdd() {
    this.props.history.push('/rewards/creation');
  }

  handleCloseExport() {
    this.setState({
      ...this.state,
      exportOpen: false,
    });
  }

  handleOpenExport() {
    this.setState({
      ...this.state,
      exportOpen: true,
    });
  }

  handlePageChange(page) {
    this.setState({
      ...this.state,
      page: page,
    });
  }

  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'reward.title' }));
    this.props.handleSubHeader(
      <TrackingSubHeader onChange={this.handlePageChange.bind(this)} />
    );
    this.props.handleButtons(
      <div>
        <AppBarIconButton
          size='small'
          onClick={this.handleOpenExport.bind(this)}
          style={{ marginRight: 8 }}
        >
          <FontAwesomeIcon icon={faFileUpload} />
        </AppBarIconButton>
        <AppBarIconButton size='small' onClick={this.handleAdd.bind(this)}>
          <FontAwesomeIcon icon={faPlus} />
        </AppBarIconButton>
      </div>
    );
    this.props.activateReturn();
  }

  componentDidUpdate() {
    const { configs, loading: configLoading } = this.props.configList;
    if (!this.state.initialized && configs) {
      const config = _.get(
        configs.find((c) => c.code === 'HCR'),
        'value',
        'false'
      ).toBoolean();
      this.props.handleSubHeader(
        <TrackingSubHeader
          onChange={this.handlePageChange.bind(this)}
          displayPending={config}
        />
      );

      this.setState({
        ...this.state,
        initialized: true,
        displayPending: config,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.page === 0 && <WaitingCollaboratorRewardOrderList />}
        {this.state.page === 1 && this.state.displayPending && (
          <PendingCollaboratorRewardOrderList />
        )}
        {((this.state.page === 1 && !this.state.displayPending) ||
          (this.state.page === 2 && this.state.displayPending)) && (
          <ValidatedCollaboratorRewardOrderList />
        )}
        {this.state.exportOpen && (
          <RewardOrderListExport
            open={this.state.exportOpen}
            onClose={this.handleCloseExport.bind(this)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ configList }) => ({
  configList,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(CollaboratorRewardOrderTracking));
