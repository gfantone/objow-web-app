import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import {
  MainLayoutComponent,
  LanguageSelect,
  I18nWrapper,
  CollaboratorEdit,
} from '../../../../components';
import * as accountUpdateActions from '../../../../services/Account/AccountUpdate/actions';
import * as userUpdatePasswordActions from '../../../../services/Users/UserUpdatePassword/actions';
import '../../../../helpers/FormsyHelper';
import { injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import _ from 'lodash';

const styles = {
  photo: {
    height: 100,
    width: 100,
  },
  refreshButton: {
    textAlign: 'center',
  },
};

class AccountDetail extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
    this.props.accountUpdateActions.clearAccountUpdate();
  }

  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'account.title' }));
    this.props.handleMaxWidth('sm');
    this.props.activateReturn();
  }

  handleValueChange = (name) => (value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleValidSubmit = (model) => {
    const { account: oldAccount } = this.props.accountDetail;
    const newAccountPhoto = new FormData();

    if (model.photo) {
      newAccountPhoto.append('photo', model.photo, model.photo.name);
    }
    const newAccount = {
      firstname: model.firstname,
      lastname: model.lastname,
      email: model.email,
      citation: oldAccount.role.code != 'A' ? model.citation : null,
      title: model.title,
      locale: model.locale,
      identifiers: model.identifiers
        ? model.identifiers.map((identifier, index) => {
            return { order: index, value: identifier ? identifier : '' };
          })
        : oldAccount.identifiers.map((identifier) => {
            return {
              order: _.get(identifier, 'definition.order'),
              value: _.get(identifier, 'value'),
            };
          }),
      allow_pending_notifications: model.allow_pending_notifications,
    };

    this.props.accountUpdateActions.updateAccount(newAccount, newAccountPhoto);
    if (model.password && model.password != '') {
      this.props.userUpdatePasswordActions.updateUserPassword(
        this.props.accountDetail.account.id,
        model.password
      );
    }
  };

  render() {
    const { intl } = this.props;
    const { classes } = this.props;
    const { account } = this.props.accountDetail;
    const { loading, success } = this.props.accountUpdate;
    const photo = account.photo ? account.photo : '/assets/img/user/avatar.svg';

    const mobileScreen = isWidthDown('xs', this.props.width);
    const { detect } = require('detect-browser');
    const browser = detect();
    const isIos = browser.name === 'ios-webview';

    const LanguageField = ({ initial }) => {
      const context = useContext(I18nWrapper.Context);
      return (
        <LanguageSelect
          name='locale'
          label={intl.formatMessage({ id: 'admin.user.locale' })}
          initial={initial || context.locale}
          noCard
        />
      );
    };

    if (success) {
      this.props.accountUpdateActions.clearAccountUpdate();
      toast.success(
        intl.formatMessage({ id: 'common.update_success_message' })
      );
    }

    return (
      <div>
        {account && (
          <CollaboratorEdit
            account={account}
            onSubmit={this.handleValidSubmit}
            loading={loading}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ accountDetail, accountUpdate }) => ({
  accountDetail,
  accountUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  accountUpdateActions: bindActionCreators(accountUpdateActions, dispatch),
  userUpdatePasswordActions: bindActionCreators(
    userUpdatePasswordActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withWidth()(injectIntl(AccountDetail))));
