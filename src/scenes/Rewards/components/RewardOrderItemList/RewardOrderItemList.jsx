import React from 'react';
import { withRouter } from 'react-router-dom';
import { CardMedia, Divider, Grid, IconButton, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
  AccentTag,
  Button,
  Card,
  DefaultText,
  Quantity,
  CollaboratorSimple,
  Avatar,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import '../../../../helpers/StringHelper';
import _ from 'lodash';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginLeft: -16,
    marginRight: -16,
  },
  icon: {
    width: 39,
    height: 39,
  },
  image: {
    borderRadius: 16,
    height: 150,
    [theme.breakpoints.up('sm')]: {
      height: 100,
      width: 230,
    },
  },
  name: {
    overflow: 'hidden',
    position: 'relative',
    lineHeight: '1.5em',
    maxHeight: '3em',
    textAlign: 'justify',
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
  points: {
    marginTop: 11,
  },
}));

const RewardOrderItemList = ({ items, onItemChange, ...props }) => {
  const intl = useIntl();
  const classes = useStyles();
  const hasItems = items.length > 0;
  const { account } = props.accountDetail;

  const handleItemChange = (reward) => (quantity) => {
    if (onItemChange) onItemChange(reward, quantity);
  };

  const handleRemoveItem = (reward) => () => {
    if (onItemChange) onItemChange(reward, 0);
  };

  function handleReturnClick() {
    props.history.goBack();
  }
  const itemsWithCollaborators = items.filter((item) => item.collaborator);
  const itemsWithTeams = items.filter((item) => item.team);

  return (
    <div>
      <Grid container spacing={1}>
        {itemsWithCollaborators.length > 0 && account.role.code !== 'C' && (
          <Grid item xs={12}>
            <Chip
              size='small'
              label={itemsWithCollaborators[0].collaborator.fullname}
              avatar={
                <Avatar
                  src={_.get(itemsWithCollaborators[0].collaborator, 'photo')}
                  entityId={_.get(itemsWithCollaborators[0].collaborator, 'id')}
                  fallbackName={_.get(
                    itemsWithCollaborators[0].collaborator,
                    'fullname'
                  )}
                  fontSize={10}
                />
              }
              style={{
                borderColor: _.get(
                  itemsWithCollaborators[0].collaborator,
                  'team.color.hex'
                ),
              }}
              variant='outlined'
            />
          </Grid>
        )}
        {itemsWithTeams.length > 0 &&
          (account.role.code === 'A' || account.role.code === 'S') && (
            <Grid item xs={12}>
              <Chip
                size='small'
                label={itemsWithTeams[0].team.name}
                style={{
                  borderColor: _.get(itemsWithTeams[0].team, 'team.color.hex'),
                }}
                variant='outlined'
              />
            </Grid>
          )}
        <Grid item xs={12}>
          <Card>
            <Grid container spacing={2}>
              {hasItems &&
                items.map((item, index) => {
                  const totalPoints = item.quantity * item.reward.points;

                  return (
                    <React.Fragment>
                      {index > 0 && (
                        <Grid key={`D${item.reward.id}`} item xs={12}>
                          <Divider className={classes.divider} />
                        </Grid>
                      )}
                      <Grid key={`R${item.reward.id}`} item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm='auto'>
                            <CardMedia
                              image={
                                item.reward.customImage
                                  ? item.reward.customImage
                                  : item.reward.image.path
                              }
                              className={classes.image}
                            />
                          </Grid>
                          <Grid item xs>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <DefaultText className={classes.name}>
                                  {item.reward.name}
                                </DefaultText>
                              </Grid>
                              <Grid item>
                                <AccentTag className={classes.points}>
                                  {intl
                                    .formatMessage({
                                      id: 'reward.order_item_list.points_value',
                                    })
                                    .format(item.reward.points)}
                                </AccentTag>
                              </Grid>
                              <Grid item>
                                <CardMedia
                                  image={item.reward.category.icon.path}
                                  className={classes.icon}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              spacing={1}
                              direction='column'
                              alignItems='center'
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
                                  initial={item.quantity}
                                  minimum={0}
                                  onChange={
                                    onItemChange
                                      ? handleItemChange(item.reward)
                                      : null
                                  }
                                />
                              </Grid>
                              <Grid item>
                                <AccentTag>
                                  {intl
                                    .formatMessage({
                                      id: 'reward.order_item_list.points_value',
                                    })
                                    .format(totalPoints)}
                                </AccentTag>
                              </Grid>
                            </Grid>
                          </Grid>
                          {onItemChange && (
                            <Grid item>
                              <IconButton
                                size='small'
                                onClick={handleRemoveItem(item.reward)}
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </IconButton>
                            </Grid>
                          )}
                          <Grid item xs={12}>
                            <Grid container spacing={2}>
                              <Grid item>
                                <DefaultText>
                                  <FontAwesomeIcon icon={faFolderOpen} />{' '}
                                  {item.reward.category.name}
                                </DefaultText>
                              </Grid>
                              <Grid item>
                                <DefaultText>
                                  {intl.formatMessage({
                                    id: 'reward.order_item_list.value_label',
                                  })}{' '}
                                  : {'{0} €'.format(item.reward.value)}
                                </DefaultText>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  );
                })}
              {!hasItems && (
                <Grid item xs={12}>
                  <DefaultText>
                    {intl.formatMessage({
                      id: 'reward.order_item_list.empty_text',
                    })}
                  </DefaultText>
                </Grid>
              )}
              {onItemChange && (
                <Grid item xs={12}>
                  <Button onClick={handleReturnClick}>
                    {intl.formatMessage({
                      id: 'reward.order_item_list.close_button',
                    })}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = ({ accountDetail }) => ({ accountDetail });
export default connect(mapStateToProps)(withRouter(RewardOrderItemList));
