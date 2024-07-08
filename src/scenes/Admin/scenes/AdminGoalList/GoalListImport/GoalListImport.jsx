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
} from '../../../../../components';
import * as goalListImportActions from '../../../../../services/Goals/GoalListImport/actions';
import * as goalListImportErrors from '../../../../../services/Goals/GoalListImport/errorTypes';

var initialized = false;

const GoalListImport = ({ open, onClose, ...props }) => {
  const intl = useIntl();
  const { success, loading, error } = props.goalListImport;
  const errorMessage =
    error === goalListImportErrors.BAD_REQUEST_ERROR
      ? intl.formatMessage({ id: 'admin.goal.import.error1' })
      : error === goalListImportErrors.UNKNOWN_ERROR
      ? intl.formatMessage({ id: 'admin.goal.import.error2' })
      : null;

  useEffect(() => {
    if (!initialized) {
      initialized = true;
      props.goalListImportActions.clearGoalListImport();
    }
  });

  if (success) {
    props.goalListImportActions.clearGoalListImport();
    onClose();
  }

  const onDialogClose = () => {
    if (!loading) {
      props.goalListImportActions.clearGoalListImport();
      onClose();
    }
  };

  const onSubmit = (model) => {
    const request = new FormData();
    request.append('file', model.file, model.file.name);
    props.goalListImportActions.clearGoalListImport();
    props.goalListImportActions.importGoalList(request);
  };

  return (
    <Dialog open={open} onClose={onDialogClose}>
      <Formsy onValidSubmit={onSubmit}>
        <DialogTitle onClose={onDialogClose}>
          {intl.formatMessage({ id: 'admin.goal.import.title' })}
        </DialogTitle>
        <DialogContent style={{ textTransform: 'none', fontSize: 14 }}>
          <div>
            <FileInput name="file" accept=".csv" required />
          </div>
          <div>
            <br />
            {intl.formatMessage({ id: 'admin.goal.import.text1' })}
            <br />
            {intl.formatMessage({ id: 'admin.goal.import.text2' })}
            <ol>
              <li>
                {intl.formatMessage({ id: 'admin.goal.import.condition1' })}
              </li>
              <li>
                {intl.formatMessage({ id: 'admin.goal.import.condition2' })}
              </li>
              <li>
                {intl.formatMessage({ id: 'admin.goal.import.condition3' })}
              </li>
              <li>
                {intl.formatMessage({ id: 'admin.goal.import.condition4' })}
              </li>
              <li>
                {intl.formatMessage({ id: 'admin.goal.import.condition5' })}
              </li>
            </ol>
          </div>
          <div>
            {intl.formatMessage({ id: 'admin.goal.import.condition6' })}
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

const mapStateToProps = ({ goalListImport }) => ({
  goalListImport,
});

const mapDispatchToProps = (dispatch) => ({
  goalListImportActions: bindActionCreators(goalListImportActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalListImport);
