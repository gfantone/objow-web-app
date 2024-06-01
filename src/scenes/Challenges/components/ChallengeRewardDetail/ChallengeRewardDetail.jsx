import React from 'react';
import { connect } from 'react-redux';
import { Grid, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { RewardDetailImage } from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import {
  AccentText,
  BoldSpan,
  Card,
  DefaultText,
  DefaultTitle,
  IconButton,
  InfoText,
  Linkify,
  MainLayoutComponent,
  Quantity,
  RichText,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const DEFAULT_QUANTITY = 1;

const styles = {
  panel: {
    backgroundColor: 'initial',
    borderRadius: 'initial',
    boxShadow: 'none',
  },
  panelSummary: {
    margin: 'none',
    padding: 'initial',
  },
  panelSummaryIcon: {
    color: '#00E58D',
  },
  panelDetails: {
    padding: 'initial',
  },
};

const ChallengeRewardDetail = ({ reward, ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  const { account } = props.accountDetail;
  const categoryIcon = _.get(reward, 'category.icon.path');
  const image = reward
    ? reward.image
      ? reward.image.path
      : reward.customImage
    : null;
  return (
    <React.Fragment>
      {reward && (
        <Grid container spacing={2}>
          <Grid item xs>
            <Grid container spacing={2}>
              <Grid item xs>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <DefaultText lowercase>
                      <BoldSpan>{reward.name}</BoldSpan>
                    </DefaultText>
                  </Grid>
                  <Grid item>
                    <DefaultText>
                      <BoldSpan>
                        <FontAwesomeIcon icon={faFolderOpen} />{' '}
                        {_.get(reward, 'category.name')}
                      </BoldSpan>
                    </DefaultText>
                  </Grid>
                  <Grid item>
                    <DefaultText>
                      <BoldSpan>
                        {intl
                          .formatMessage({ id: 'reward.detail.value_text' })
                          .format(reward.value)}
                      </BoldSpan>
                    </DefaultText>
                  </Grid>
                </Grid>
              </Grid>
              {((account.role.code === 'C' && reward.type.code === 'P') ||
                (account.role.code === 'M' && reward.type.code === 'T')) && (
                <Grid item>
                  <Grid
                    container
                    spacing={1}
                    direction="column"
                    alignItems="center"
                  >
                    <Grid item>
                      <DefaultText>
                        {intl.formatMessage({
                          id: 'reward.order_item_list.quantity_label',
                        })}
                      </DefaultText>
                    </Grid>
                    <Grid item>
                      <Quantity
                        initial={DEFAULT_QUANTITY}
                        minimum={1}
                        onChange={this.handleQuantityChange.bind(this)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12}>
                <Linkify>
                  <RichText
                    initial={JSON.parse(reward.description)}
                    readOnly={true}
                    onChange={() => {}}
                  />
                </Linkify>
              </Grid>
              <Grid item xs={12}>
                {(reward.deliveryPlace || reward.deliveryMode) && (
                  <DefaultText>
                    <BoldSpan>
                      {intl.formatMessage({ id: 'reward.form.delivery_area' })}
                    </BoldSpan>
                  </DefaultText>
                )}
                <DefaultText lowercase>
                  <BoldSpan>
                    {reward.deliveryPlace &&
                      intl
                        .formatMessage({
                          id: 'reward.detail.delivery_place_text',
                        })
                        .format('')}
                  </BoldSpan>{' '}
                  {reward.deliveryPlace}
                </DefaultText>
                <DefaultText lowercase>
                  <BoldSpan>
                    {reward.deliveryMode &&
                      intl
                        .formatMessage({
                          id: 'reward.detail.delivery_mode_text',
                        })
                        .format('')}
                  </BoldSpan>{' '}
                  {reward.deliveryMode}
                </DefaultText>
                {reward.deliveryTime && reward.deliveryTime !== '' && (
                  <DefaultText lowercase>
                    <BoldSpan>
                      {intl
                        .formatMessage({
                          id: 'reward.detail.delivery_time_text',
                        })
                        .format('')}
                    </BoldSpan>{' '}
                    {reward.deliveryTime}
                  </DefaultText>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md="auto">
            <RewardDetailImage image={image} />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({ accountDetail, rewardDetail }) => ({
  accountDetail,
  rewardDetail,
});

export default connect(mapStateToProps)(
  withStyles(styles)(ChallengeRewardDetail),
);
