import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Base, Customization, SubHeader } from './components';
import { MainLayoutComponent } from '../../../../components';
import * as Resources from '../../../../Resources';
import * as goalDefinitionDetailActions from '../../../../services/GoalDefinitions/GoalDefinitionDetail/actions';
import { useIntl, injectIntl } from 'react-intl';

class AdminGoalUpdate extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.id = null;
    this.state = {
      page: 0,
    };
  }

  handlePageChange(page) {
    this.setState({
      ...this.state,
      page: page,
    });
  }

  componentDidMount() {
    const { intl } = this.props;
    this.id = this.props.match.params.id;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <SubHeader
        onChange={this.handlePageChange.bind(this)}
        readonly={!this.props.location.state}
      />,
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.goalDefinitionDetailActions.getGoalDefinition(this.id);
  }

  render() {
    const { definition, loading } = this.props.goalDefinitionDetail;

    return (
      <div>
        {!loading && definition && this.state.page === 0 && (
          <Base
            id={this.props.match.params.id}
            period={this.props.match.params.periodId}
          />
        )}
        {!loading && definition && this.state.page === 1 && (
          <Customization id={this.id} />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ goalDefinitionDetail }) => ({
  goalDefinitionDetail,
});

const mapDispatchToProps = (dispatch) => ({
  goalDefinitionDetailActions: bindActionCreators(
    goalDefinitionDetailActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(AdminGoalUpdate));
