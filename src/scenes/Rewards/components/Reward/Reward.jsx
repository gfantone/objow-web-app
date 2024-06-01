import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ButtonBase, CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Button, RewardImage } from './components';
import { AccentTag, DefaultText } from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import '../../../../helpers/StringHelper';

const styles = {
  icon: {
    width: 39,
    height: 39,
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
  },
  name: {
    overflow: 'hidden',
    position: 'relative',
    lineHeight: '1.5em',
    maxHeight: '3em',
    textAlign: 'left',
    '&&:before': {
      content: '"..."',
      position: 'absolute',
      right: 0,
      bottom: 1,
      paddingLeft: 2,
      background: 'white',
    },
    '&&:after': {
      content: '""',
      position: 'absolute',
      right: 0,
      width: '1em',
      height: '1em',
      marginTop: '0.2em',
      background: 'white',
    },
  },
  timerContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
};

const Reward = ({
  detailDisabled = false,
  onAddClick,
  reward,
  collaborator,
  ...props
}) => {
  const intl = useIntl();
  const { classes } = props;
  const { account } = props.accountDetail;
  const image = reward.image ? reward.image.path : reward.customImage;

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ButtonBase
                disabled={detailDisabled}
                disableRipple
                onClick={() =>
                  props.history.push(
                    `/rewards/detail/${reward.id}${
                      collaborator ? `/?collaborator_id=${collaborator.id}` : ''
                    }`
                  )
                }
                style={{ width: '100%' }}
              >
                <div className={classes.imageContainer}>
                  <div className={classes.timerContainer}>
                    <AccentTag style={{ borderRadius: 5 }}>
                      {intl
                        .formatMessage({ id: 'reward.point_tag' })
                        .format(reward.points)}
                    </AccentTag>
                  </div>
                  <RewardImage image={image} />
                </div>
              </ButtonBase>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase
                    disabled={detailDisabled}
                    disableRipple
                    onClick={() =>
                      props.history.push(
                        `/rewards/detail/${reward.id}${
                          collaborator
                            ? `/?collaborator_id=${collaborator.id}`
                            : ''
                        }`
                      )
                    }
                    style={{ width: '100%' }}
                  >
                    <CardMedia
                      image={reward.category.icon.path}
                      className={classes.icon}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs>
                  <ButtonBase
                    disabled={detailDisabled}
                    disableRipple
                    onClick={() =>
                      props.history.push(
                        `/rewards/detail/${reward.id}${
                          collaborator
                            ? `/?collaborator_id=${collaborator.id}`
                            : ''
                        }`
                      )
                    }
                    style={{ width: '100%' }}
                  >
                    <DefaultText
                      lowercase
                      className={classes.name}
                      style={{
                        width: '100%',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}
                    >
                      {reward.name}
                    </DefaultText>
                  </ButtonBase>
                </Grid>
                {onAddClick &&
                  ((account.role.code === 'C' && reward.type.code !== 'T') ||
                    account.role.code === 'A' ||
                    account.role.code === 'S' ||
                    (['M'].indexOf(account.role.code) >= 0 &&
                      (account.hasRewardCreationAccess ||
                        reward.type.code === 'T'))) && (
                    <Grid item>
                      <Button onClick={() => onAddClick(reward)}>
                        {intl.formatMessage({ id: 'common.add' })}
                      </Button>
                    </Grid>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default withStyles(styles)(connect(mapStateToProps)(withRouter(Reward)));
