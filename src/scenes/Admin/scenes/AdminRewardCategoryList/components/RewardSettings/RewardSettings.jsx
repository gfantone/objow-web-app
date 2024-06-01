import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import { Switch, ProgressButton } from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import * as configListUpdateActions from '../../../../../../services/Configs/ConfigListUpdate/actions';
import * as configListActions from '../../../../../../services/Configs/ConfigList/actions';
import '../../../../../../helpers/StringHelper';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const RewardSettings = ({ ...props }) => {
  const intl = useIntl();
  const { configs, loading } = props.configList;
  const { success, error } = props.configListUpdate;
  const [formState, setFormState] = useState({
    CRWA: configs.find((x) => x.code === 'CRWA').value.toBoolean(),
    TRWA: configs.find((x) => x.code === 'TRWA').value.toBoolean(),
    MRWC: configs.find((x) => x.code === 'MRWC').value.toBoolean(),
    MRWN: configs.find((x) => x.code === 'MRWN').value.toBoolean(),
  });
  const history = useHistory();

  const handleChange = (code, value) => {
    setFormState((prev) => ({ ...prev, [code]: value }));
  };

  const handleSubmit = () => {
    const configsToUpdate = [
      {
        id: configs.find((x) => x.code === 'CRWA').id,
        value: formState.CRWA,
      },
      {
        id: configs.find((x) => x.code === 'TRWA').id,
        value: formState.TRWA,
      },
      {
        id: configs.find((x) => x.code === 'MRWC').id,
        value: formState.MRWC,
      },
      {
        id: configs.find((x) => x.code === 'MRWN').id,
        value: formState.MRWN,
      },
    ];
    props.configListUpdateActions.updateConfigList(configsToUpdate);
  };

  useEffect(() => {
    if (success) {
      props.configListUpdateActions.clearConfigListUpdate();
      toast.success(
        intl.formatMessage({ id: 'common.update_success_message' })
      );
      history.push('/admin');
    }
    if (error) {
      toast.error(intl.formatMessage({ id: 'common.update_error_message' }));
    }
  }, [success, error, intl, history, props.configListUpdateActions]);

  return (
    <div>
      <Formsy onValidSubmit={handleSubmit}>
        <Switch
          isContrast
          name='collaborator_reward_activation'
          label={intl.formatMessage({
            id: 'reward.settings.collaborator_reward_activation_option',
          })}
          initial={formState.CRWA}
          onChange={(value) => handleChange('CRWA', value)}
          disabled={loading}
        />
        <Switch
          isContrast
          name='team_reward_activation'
          label={intl.formatMessage({
            id: 'reward.settings.team_reward_activation_option',
          })}
          initial={formState.TRWA}
          onChange={(value) => handleChange('TRWA', value)}
          disabled={loading}
        />
        <Switch
          isContrast
          name='manager_reward_creation'
          label={intl.formatMessage({
            id: 'reward.settings.manager_reward_creation',
          })}
          initial={formState.MRWC}
          onChange={(value) => handleChange('MRWC', value)}
          disabled={loading}
        />
        <Switch
          isContrast
          name='manager_reward_notification'
          label={intl.formatMessage({
            id: 'reward.settings.manager_reward_notification',
          })}
          initial={formState.MRWN}
          onChange={(value) => handleChange('MRWN', value)}
          disabled={loading}
        />
        <Grid item xs={12}>
          <ProgressButton
            type='submit'
            text={intl.formatMessage({ id: 'common.submit' })}
            centered
            loading={loading}
          />
        </Grid>
      </Formsy>
    </div>
  );
};

const mapStateToProps = ({
  configList,
  configListUpdate,
  rewardCategoryList,
}) => ({
  configList,
  configListUpdate,
  rewardCategoryList,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
  configListUpdateActions: bindActionCreators(
    configListUpdateActions,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RewardSettings);
