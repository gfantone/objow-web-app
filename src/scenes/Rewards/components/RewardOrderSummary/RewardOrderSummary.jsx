import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  AccentText,
  BoldSpan,
  Button,
  Card,
  DefaultText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ErrorText,
  ProgressButton,
  RedButton,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import '../../../../helpers/StringHelper';

const styles = {
  divider: {
    marginLeft: -16,
    marginRight: -16,
  },
};

const RewardOrderSummary = ({
  recipientPoints,
  onOrderClick,
  onRefuseClick,
  onValidateClick,
  orderId,
  orderLoading,
  orderPoints,
  orderValue,
  updateLoading,
  ...props
}) => {
  const intl = useIntl();
  const { classes } = props;
  const remainingPoints =
    recipientPoints !== undefined && recipientPoints !== null
      ? recipientPoints - orderPoints
      : null;
  const [orderOpen, setOrderOpen] = React.useState(false);
  const [validateOpen, setValidateOpen] = React.useState(false);
  const [refuseOpen, setRefuseOpen] = React.useState(false);

  function changeOrderOpen(open) {
    setOrderOpen(open);
  }

  function changeRefuseOpen(open) {
    setRefuseOpen(open);
  }

  function changeValidateOpen(open) {
    setValidateOpen(open);
  }

  return (
    <div>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {recipientPoints !== undefined && (
                <Grid item xs={12}>
                  <DefaultText>
                    {intl.formatMessage({
                      id: 'reward.order_summary.recipient_points_label',
                    })}{' '}
                    :{' '}
                    <BoldSpan>
                      {intl
                        .formatMessage({
                          id: 'reward.order_summary.recipient_points_value',
                        })
                        .format(recipientPoints || 0)}
                    </BoldSpan>
                  </DefaultText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
                <DefaultText>
                  {onOrderClick
                    ? intl.formatMessage({
                        id: 'reward.order_summary.cart_points_label',
                      })
                    : intl.formatMessage({
                        id: 'reward.order_summary.order_points_label',
                      })}{' '}
                  :{' '}
                  <BoldSpan>
                    {intl
                      .formatMessage({
                        id: 'reward.order_summary.order_points_value',
                      })
                      .format(orderPoints)}
                  </BoldSpan>
                </DefaultText>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
                <DefaultText>
                  {intl.formatMessage({
                    id: 'reward.order_summary.order_value_label',
                  })}{' '}
                  : <BoldSpan>{'{0} €'.format(orderValue)}</BoldSpan>
                </DefaultText>
              </Grid>
            </Grid>
          </Grid>
          {remainingPoints !== null && (
            <Grid item xs={12}>
              {remainingPoints >= 0 && (
                <AccentText>
                  {intl.formatMessage({
                    id: 'reward.order_summary.remaining_points_label',
                  })}{' '}
                  :{' '}
                  <BoldSpan>
                    {intl
                      .formatMessage({
                        id: 'reward.order_summary.remaining_points_value',
                      })
                      .format(remainingPoints)}
                  </BoldSpan>
                </AccentText>
              )}
              {remainingPoints < 0 && (
                <ErrorText>
                  {intl.formatMessage({
                    id: 'reward.order_summary.remaining_points_label',
                  })}{' '}
                  :{' '}
                  <BoldSpan>
                    {intl
                      .formatMessage({
                        id: 'reward.order_summary.remaining_points_value',
                      })
                      .format(remainingPoints)}
                  </BoldSpan>
                </ErrorText>
              )}
            </Grid>
          )}
          {onValidateClick && onRefuseClick && (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button onClick={() => changeValidateOpen(true)}>
                    {intl.formatMessage({ id: 'common.submit' })}
                  </Button>
                </Grid>
                <Grid item>
                  <RedButton onClick={() => changeRefuseOpen(true)}>
                    {intl.formatMessage({
                      id: 'reward.order_summary.refuse_button',
                    })}
                  </RedButton>
                </Grid>
              </Grid>
            </Grid>
          )}
          {onOrderClick && (
            <Grid item xs={12}>
              <Button
                disabled={remainingPoints < 0}
                onClick={() => changeOrderOpen(true)}
              >
                {intl.formatMessage({
                  id: 'reward.order_summary.order_button',
                })}
              </Button>
            </Grid>
          )}
        </Grid>
      </Card>
      {onOrderClick && (
        <Dialog open={orderOpen} onClose={() => changeOrderOpen(false)}>
          <DialogTitle>
            {intl
              .formatMessage({ id: 'reward.order_summary.confirm_order_title' })
              .format(orderPoints, orderValue)}
          </DialogTitle>
          <DialogContent>
            {intl.formatMessage({
              id: 'reward.order_summary.confirm_order_message',
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => changeOrderOpen(false)} color='secondary'>
              {intl.formatMessage({ id: 'common.no' })}
            </Button>
            <ProgressButton
              type='button'
              text={intl.formatMessage({ id: 'common.yes' })}
              loading={orderLoading}
              onClick={onOrderClick}
            />
          </DialogActions>
        </Dialog>
      )}
      {onRefuseClick && (
        <Dialog open={refuseOpen} onClose={() => changeRefuseOpen(false)}>
          <DialogTitle>
            {intl
              .formatMessage({
                id: 'reward.order_summary.confirm_refuse_title',
              })
              .format(orderId, orderPoints, orderValue)}
          </DialogTitle>
          <DialogContent>
            {intl.formatMessage({
              id: 'reward.order_summary.confirm_refuse_message',
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => changeRefuseOpen(false)} color='secondary'>
              {intl.formatMessage({ id: 'common.no' })}
            </Button>
            <ProgressButton
              type='button'
              text={intl.formatMessage({ id: 'common.yes' })}
              loading={updateLoading}
              onClick={onRefuseClick}
            />
          </DialogActions>
        </Dialog>
      )}
      {onValidateClick && (
        <Dialog open={validateOpen} onClose={() => changeValidateOpen(false)}>
          <DialogTitle>
            {intl
              .formatMessage({
                id: 'reward.order_summary.confirm_validate_title',
              })
              .format(orderId, orderPoints, orderValue)}
          </DialogTitle>
          <DialogContent>
            {intl.formatMessage({
              id: 'reward.order_summary.confirm_validate_message',
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => changeValidateOpen(false)} color='secondary'>
              {intl.formatMessage({ id: 'common.no' })}
            </Button>
            <ProgressButton
              type='button'
              text={intl.formatMessage({ id: 'common.yes' })}
              loading={updateLoading}
              onClick={onValidateClick}
            />
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default withStyles(styles)(RewardOrderSummary);
