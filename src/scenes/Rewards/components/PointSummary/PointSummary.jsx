import React from 'react';
import { Grid } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import {
  AccentText,
  Badge,
  BoldSpan,
  Button,
  ProgressButton,
  Card,
  DefaultText,
  DefaultTitle,
  ErrorText,
} from '../../../../components';
import api from '../../../../data/api/api';
import { useIntl } from 'react-intl';
import '../../../../helpers/StringHelper';
import * as Resources from '../../../../Resources';
import { toast } from 'react-toastify';
import _ from 'lodash';

const PointSummary = ({
  points,
  usedPoints,
  validatedValues,
  waitingPoints,
  onTrackingClick,
  orders,
  displayPanopliButton,
  ...props
}) => {
  const intl = useIntl();
  const [panopliLoading, setPanopliLoading] = React.useState(false);
  const usablePoints = points - usedPoints - waitingPoints;

  const usablePointsText = intl
    .formatMessage({ id: 'point_summary.usable_points_value' })
    .format(usablePoints);
  const alignItems = isWidthUp('sm') ? 'flex-end' : 'flex-start';

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DefaultTitle isContrast>
            {intl.formatMessage({ id: 'point_summary.title' })}
          </DefaultTitle>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Grid container spacing={2}>
              <Grid item xs={12} sm>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <DefaultText lowercase>
                      {intl.formatMessage({ id: 'point_summary.points_label' })}{' '}
                      :{' '}
                      <BoldSpan component='span' lowercase>
                        {intl
                          .formatMessage({ id: 'point_summary.points_value' })
                          .format(points || 0)}
                      </BoldSpan>
                    </DefaultText>
                  </Grid>
                  <Grid item xs={12}>
                    <DefaultText lowercase>
                      {intl.formatMessage({
                        id: 'point_summary.used_points_label',
                      })}{' '}
                      :{' '}
                      <BoldSpan component='span'>
                        {intl
                          .formatMessage({
                            id: 'point_summary.used_points_value',
                          })
                          .format(usedPoints || 0)}
                      </BoldSpan>
                    </DefaultText>
                  </Grid>
                  <Grid item xs={12}>
                    <DefaultText lowercase>
                      {intl.formatMessage({
                        id: 'point_summary.validated_values_label',
                      })}{' '}
                      :{' '}
                      <BoldSpan component='span' lowercase>
                        {intl
                          .formatMessage({
                            id: 'point_summary.validated_values_value',
                          })
                          .format(validatedValues || 0)}
                      </BoldSpan>
                    </DefaultText>
                  </Grid>
                  <Grid item xs={12}>
                    <DefaultText lowercase>
                      {intl.formatMessage({
                        id: 'point_summary.waiting_points_label',
                      })}{' '}
                      :{' '}
                      <BoldSpan component='span'>
                        {intl
                          .formatMessage({
                            id: 'point_summary.waiting_points_value',
                          })
                          .format(waitingPoints || 0)}
                      </BoldSpan>
                    </DefaultText>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm='auto'>
                <Grid
                  container
                  direction='column'
                  justify='space-between'
                  alignItems={alignItems}
                  style={{ height: '100%' }}
                >
                  <Grid item>
                    {usablePoints >= 0 && (
                      <AccentText
                        style={{ textTransform: 'none', fontSize: 16 }}
                      >
                        {intl.formatMessage({
                          id: 'point_summary.usable_points_label',
                        })}{' '}
                        : <BoldSpan>{usablePointsText}</BoldSpan>
                      </AccentText>
                    )}
                    {usablePoints < 0 && (
                      <ErrorText
                        style={{ textTransform: 'none', fontSize: 16 }}
                      >
                        {intl.formatMessage({
                          id: 'point_summary.usable_points_label',
                        })}{' '}
                        : <BoldSpan>{usablePointsText}</BoldSpan>
                      </ErrorText>
                    )}
                  </Grid>
                  {onTrackingClick && (
                    <Grid item>
                      <Badge badgeContent={orders} color='secondary'>
                        <Button onClick={onTrackingClick}>
                          {intl.formatMessage({
                            id: 'point_summary.orders_button',
                          })}
                        </Button>
                      </Badge>
                    </Grid>
                  )}
                  {displayPanopliButton && (
                    <Grid item>
                      <ProgressButton
                        loading={panopliLoading}
                        text={intl.formatMessage({
                          id: 'point_summary.panopli_button',
                        })}
                        onClick={() => {
                          setPanopliLoading(true);
                          api.partners
                            .panopli_url()
                            .then((response) => {
                              const url = _.get(response, 'data.loginLink');
                              setPanopliLoading(false);
                              if (url) {
                                window.open(url, '_blank');
                                // window.location.href = url;
                              } else {
                                toast.error(
                                  intl.formatMessage({
                                    id: 'point_summary.panopli_error',
                                  })
                                );
                              }
                            })
                            .catch(() => {
                              setPanopliLoading(false);
                              toast.error(
                                intl.formatMessage({
                                  id: 'point_summary.panopli_error',
                                })
                              );
                            });
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default withWidth()(PointSummary);
