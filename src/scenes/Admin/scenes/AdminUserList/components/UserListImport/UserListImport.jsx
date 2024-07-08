import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { useIntl } from 'react-intl';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ProgressButton,
  FileInput,
} from '../../../../../../components';
import * as userListImportActions from '../../../../../../services/Users/UserListImport/actions';
import * as userListImportErrors from '../../../../../../services/Users/UserListImport/errorTypes';

var initialized = false;

const UserListImport = ({ open, onClose, ...props }) => {
  const intl = useIntl();
  const { success, loading, error } = props.userListImport;
  const errorMessage =
    error === userListImportErrors.BAD_REQUEST_ERROR
      ? intl.formatMessage({ id: 'admin.user.import.error1' })
      : error === userListImportErrors.UNKNOWN_ERROR
      ? intl.formatMessage({ id: 'admin.user.import.error2' })
      : null;

  useEffect(() => {
    if (!initialized) {
      initialized = true;
      props.userListImportActions.clearUserListImport();
    }
  });

  if (success) {
    props.userListImportActions.clearUserListImport();
    onClose();
  }

  const onDialogClose = () => {
    if (!loading) {
      props.userListImportActions.clearUserListImport();
      onClose();
    }
  };

  const onSubmit = (model) => {
    const request = new FormData();
    request.append('file', model.file, model.file.name);
    props.userListImportActions.clearUserListImport();
    props.userListImportActions.importUserList(request);
  };

  return (
    <Dialog open={open} onClose={onDialogClose}>
      <Formsy onValidSubmit={onSubmit}>
        <DialogTitle>
          {intl.formatMessage({ id: 'admin.user.import.title' })}
        </DialogTitle>
        <DialogContent style={{ textTransform: 'none', fontSize: 14 }}>
          <div>
            <FileInput name="file" accept=".csv" required />
          </div>
          <div>
            <br />
            {intl.formatMessage({ id: 'admin.user.import.text1' })}
            <br />
            {intl.formatMessage({ id: 'admin.user.import.text2' })}
            <ol>
              <li>
                {intl.formatMessage({ id: 'admin.user.import.condition1' })}
              </li>
              <li>
                {intl.formatMessage({ id: 'admin.user.import.condition2' })}
              </li>
              <li>
                {intl.formatMessage({ id: 'admin.user.import.condition3' })}
              </li>
              <li>
                {intl.formatMessage({ id: 'admin.user.import.condition4' })}
              </li>
              <li>
                {intl.formatMessage({ id: 'admin.user.import.condition5' })}
              </li>
              <li>
                {intl.formatMessage({ id: 'admin.user.import.condition9' })}
              </li>
              <li>
                {intl.formatMessage({ id: 'admin.user.import.condition6' })}
              </li>
              <li>
                {intl.formatMessage({ id: 'admin.user.import.condition7' })}
              </li>
              <li>
                {intl.formatMessage({ id: 'admin.user.import.condition8' })}
              </li>
            </ol>
          </div>
          {errorMessage && (
            <div style={{ color: '#f44336' }}>
              <br />
              {errorMessage}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="button" color="secondary" onClick={onDialogClose}>
            {intl.formatMessage({ id: 'common.cancel' })}
          </Button>
          <ProgressButton
            type="submit"
            text={intl.formatMessage({ id: 'common.import' })}
            loading={loading}
          />
        </DialogActions>
      </Formsy>
    </Dialog>
  );
};

const mapStateToProps = ({ userListImport }) => ({
  userListImport,
});

const mapDispatchToProps = (dispatch) => ({
  userListImportActions: bindActionCreators(userListImportActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListImport);
