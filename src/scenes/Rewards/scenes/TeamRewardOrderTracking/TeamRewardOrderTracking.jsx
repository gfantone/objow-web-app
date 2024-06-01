import React from 'react';
import {
  ValidatedTeamRewardOrderList,
  WaitingTeamRewardOrderList,
} from './components';
import { RewardOrderListExport, TrackingSubHeader } from '../../components';
import {
  IconButton as AppBarIconButton,
  MainLayoutComponent,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faPlus } from '@fortawesome/free-solid-svg-icons';

class TeamRewardOrderTracking extends MainLayoutComponent {
  state = { exportOpen: false, page: 0 };

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
      <TrackingSubHeader onChange={this.handlePageChange.bind(this)} />,
    );
    this.props.handleButtons(
      <div>
        <AppBarIconButton
          size="small"
          onClick={this.handleOpenExport.bind(this)}
          style={{ marginRight: 8 }}
        >
          <FontAwesomeIcon icon={faFileUpload} />
        </AppBarIconButton>
        <AppBarIconButton size="small" onClick={this.handleAdd.bind(this)}>
          <FontAwesomeIcon icon={faPlus} />
        </AppBarIconButton>
      </div>,
    );
    this.props.activateReturn();
  }

  render() {
    return (
      <div>
        {this.state.page === 0 && <WaitingTeamRewardOrderList />}
        {this.state.page === 1 && <ValidatedTeamRewardOrderList />}
        <RewardOrderListExport
          open={this.state.exportOpen}
          onClose={this.handleCloseExport.bind(this)}
        />
      </div>
    );
  }
}

export default injectIntl(TeamRewardOrderTracking);
