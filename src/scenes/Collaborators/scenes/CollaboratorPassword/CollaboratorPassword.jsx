import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import {
  Card,
  MainLayoutComponent,
  CollaboratorEdit,
  Loader,
} from '../../../../components';
import * as userUpdatePasswordActions from '../../../../services/Users/UserUpdatePassword/actions';
import * as userUpdateActions from '../../../../services/Users/UserUpdate/actions';
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';

class CollaboratorPassword extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.id = null;
  }

  componentDidMount() {
    this.id = this.props.match.params.id;
    const { intl } = this.props;
    const params = new URLSearchParams(window.location.search);
    const year = params.get('year');
    this.props.handleTitle(
      intl.formatMessage({ id: 'collaborator.update.title' })
    );
    this.props.handleMaxWidth('sm');
    this.props.activateReturn();
    this.props.collaboratorDetailActions.getCollaboratorDetail(this.id, year);
  }

  componentDidUpdate() {
    const { success } = this.props.userUpdate;
    if (success) {
      this.props.userUpdateActions.clearUserUpdate();
      toast.success('Le collaborateur a été mis à jour');
      this.props.history.goBack();
    }
  }

  handleSubmit = (model) => {
    this.props.userUpdateActions.updateUser(
      Object.assign({}, model, {
        id: this.id,
        identifiers: model.identifiers.map((identifier, index) => {
          return { order: index, value: identifier ? identifier : '' };
        }),
      })
    );
  };

  render() {
    const { intl } = this.props;

    const { collaborator, loading } = this.props.collaboratorDetail;

    return (
      <div>
        {collaborator && !loading && (
          <CollaboratorEdit
            account={collaborator}
            onSubmit={this.handleSubmit}
            hidePassword
            hideNotification
            hideRefresh
            displaySendEmail
          />
        )}
        {loading && !collaborator && <Loader centered />}
      </div>
    );
  }
}

const mapStateToProps = ({
  collaboratorDetail,
  userUpdatePassword,
  userUpdate,
}) => ({
  collaboratorDetail,
  userUpdatePassword,
  userUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  userUpdatePasswordActions: bindActionCreators(
    userUpdatePasswordActions,
    dispatch
  ),
  userUpdateActions: bindActionCreators(userUpdateActions, dispatch),
  collaboratorDetailActions: bindActionCreators(
    collaboratorDetailActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(CollaboratorPassword));
