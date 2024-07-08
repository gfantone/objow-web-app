import React from 'react';
import { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { PersonalisationPanel } from './components/PersonalisationPanel';
import { ColorPicker } from './components/ColorPicker';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamGroupKeyStart } from '../../features/teamGroup/getTeamGroup/slices';
import { useParams } from 'react-router-dom';
import { getConfigsKeyStart } from '../../features/config/getConfigs/slices';
import { Loader } from '../../../components';

const Admin = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    // todo: change for hierarchyNode later on
    dispatch(getTeamGroupKeyStart({ teamGroupId: params.contract }));
    dispatch(
      getConfigsKeyStart({ teamGroupId: params.contract, codes: ['CCPH'] })
    );
  }, []);

  const configs = useSelector((state) => state.getConfigsKey);
  const teamGroup = useSelector((state) => state.getTeamGroupKey);

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {teamGroup.loading && <Loader centered />}
          {teamGroup.success && <PersonalisationPanel />}
        </Grid>

        <Grid item xs={12}>
          {configs.loading && <Loader centered />}
          {configs.success && <ColorPicker />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
