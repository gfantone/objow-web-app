import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { PointSummary, Reward } from '..';
import {
  BasicSelect,
  Card,
  DefaultTitle,
  EmptyState,
  Loader,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const useStyles = makeStyles({
  zoom: {
    transition: 'transform 200ms',
    borderRadius: 20,
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
});

const RewardStore = ({
  onAddClick,
  rewards,
  summary,
  collaborator,
  displayPanopliButton,
  loading,
  ...props
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const sortOptions = [
    { value: 1, text: intl.formatMessage({ id: 'reward.sort_options.asc' }) },
    { value: 2, text: intl.formatMessage({ id: 'reward.sort_options.desc' }) },
  ];

  const panopliRewards = rewards.filter(
    (reward) => _.get(reward, 'category.typeCode') === 'P'
  );

  const [sort, setSort] = React.useState(sortOptions[0].value);
  const sortedRewards =
    sort === 1
      ? rewards.sort(function (a, b) {
          const x = a.points;
          const y = b.points;
          return x < y ? -1 : x > y ? 1 : 0;
        })
      : rewards.sort(function (a, b) {
          const x = a.points;
          const y = b.points;
          return x < y ? 1 : x > y ? -1 : 0;
        });

  function handleSortChange(newSort) {
    setSort(Number(newSort));
  }
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {loading && <Loader centered />}
          {!loading && summary && (
            <PointSummary
              points={summary.points}
              usedPoints={summary.usedPoints}
              validatedValues={summary.validatedValues}
              waitingPoints={summary.waitingPoints}
              displayPanopliButton={
                displayPanopliButton && panopliRewards.length > 0
              }
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid
                container
                justify='space-between'
                alignItems='flex-end'
                spacing={1}
              >
                <Grid item>
                  <DefaultTitle isContrast>
                    {intl.formatMessage({ id: 'reward.title' })}
                  </DefaultTitle>
                </Grid>
                <Grid item>
                  <BasicSelect
                    name='hello'
                    label={intl.formatMessage({ id: 'reward.sort_by' })}
                    initial={sort}
                    options={sortOptions}
                    optionValueName='value'
                    optionTextName='text'
                    emptyDisabled
                    onChange={handleSortChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {rewards.length === 0 && (
                <EmptyState
                  title={intl.formatMessage({
                    id: 'reward.store.empty_state_title',
                  })}
                  message={intl.formatMessage({
                    id: 'reward.store.empty_state_message',
                  })}
                />
              )}
              {rewards.length > 0 && (
                <Grid container spacing={3}>
                  {sortedRewards.map((reward) => {
                    return (
                      <Grid key={reward.id} item xs={12} sm={6} md={4}>
                        <Card className={classes.zoom}>
                          <Reward
                            reward={reward}
                            onAddClick={onAddClick}
                            collaborator={collaborator}
                          />
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(RewardStore);
