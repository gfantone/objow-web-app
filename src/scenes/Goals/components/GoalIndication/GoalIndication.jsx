import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardMedia, Grid, Hidden, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faBalanceScale,
  faCalendarAlt,
  faFolderOpen,
  faInfoCircle,
  faTimes,
  faPencilAlt as faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { AdviceList, LiveStatus, ReadonlyAdviceList } from './components';
import {
  AnimationController,
  BlueText,
  Card,
  DefaultText,
  DefaultTitle,
  InfoText,
  Linkify,
  Table,
  TableBody,
  TableCell,
  TableChip,
  TableRow,
  Tooltip,
  RichText,
  Collaborator,
  KpiResultUpdate,
  Dialog,
  IconButton as MenuIconButton,
} from '../../../../components';
import * as collaboratorDataListActions from '../../../../services/CollaboratorData/CollaboratorDataList/actions';
import * as collaboratorInputListActions from '../../../../services/CollaboratorInput/CollaboratorInputList/actions';
import { useIntl } from 'react-intl';
import { getDifferenceWithToday } from '../../../../helpers/DateHelper';
import _ from 'lodash';

const styles = {
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  kpiResultDialog: {
    width: 'auto',

    maxWidth: '100%',
    overflow: 'visible',
  },
  dialogCloseIcon: {
    position: 'absolute',
    color: 'white',
    top: -10,
    right: -10,
    width: 25,
    height: 25,
    fontSize: 20,
    zIndex: 100,
    background: '#00E58D',
    '&:hover': {
      background: '#00E58D',
      color: 'white',
    },
  },
  link: {
    fontSize: 14,
    cursor: 'pointer',
    color: 'rgb(15,111,222)',
    opacity: 1,
  },
};

const GoalIndication = ({
  goal,
  type,
  customRepartitions,
  classes,
  ...props
}) => {
  const intl = useIntl();
  const { account } = props.accountDetail;
  const difference = getDifferenceWithToday(goal.end);
  const isTeamManager =
    (account.team && account.team.id == goal.teamId) ||
    (account.team_group &&
      account.team_group.allTeamIds.indexOf(goal.teamId) >= 0);
  const canEdit =
    ((['M', 'S'].indexOf(account.role.code) >= 0 && isTeamManager) ||
      account.role.code == 'A') &&
    difference <= 0;
  const hasLevels = goal.levels && goal.levels.length > 0;
  const lastUpdate = goal.last_sync ? goal.last_sync.toDate() : null;
  const lastUpdateTime = lastUpdate
    ? `${lastUpdate.getHours() < 10 ? '0' : ''}${lastUpdate.getHours()}:${
        lastUpdate.getMinutes() < 10 ? '0' : ''
      }${lastUpdate.getMinutes()}`
    : null;
  const [editResultsOpen, setEditResultsOpen] = useState(false);

  const beginningOfLastMonth = new Date();
  beginningOfLastMonth.setMonth(beginningOfLastMonth.getMonth() - 1);
  beginningOfLastMonth.setDate(1);

  const closeKpiModal = () => {
    props.collaboratorDataListActions.getCollaboratorDataListClear();
    props.collaboratorInputListActions.getCollaboratorInputListClear();
    setEditResultsOpen(false);
  };

  const openKpiModal = () => {
    props.collaboratorDataListActions.getCollaboratorDataListClear();
    setEditResultsOpen(true);
  };

  const customRepartitionsTooltip = (
    <Grid container spacing={1} direction='column'>
      {customRepartitions &&
        customRepartitions.map((repartition) => (
          <Grid item>
            <Collaborator collaborator={repartition.collaborator} />
          </Grid>
        ))}
    </Grid>
  );

  return (
    <div>
      <Grid container spacing={2}>
<<<<<<< HEAD
=======
        {lastUpdate && (
          <Grid item xs={12} style={{ paddingTop: 0 }}>
            <DefaultText
              isContrast
              lowercase
              style={{ fontSize: 12, opacity: 0.8 }}
            >
              {intl
                .formatMessage({ id: 'challenge.condition.last_update' })
                .format(lastUpdate.toLocaleDateString(), lastUpdateTime)}
              <span style={{ fontWeight: 'bold' }}>
                {intl
                  .formatMessage({
                    id: 'challenge.condition.last_update_time',
                  })
                  .format(lastUpdate.toLocaleDateString(), lastUpdateTime)}
              </span>
            </DefaultText>
          </Grid>
        )}
>>>>>>> dev
        {(hasLevels ||
          (customRepartitions && customRepartitions.length > 0)) && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <DefaultTitle isContrast>
                  {intl.formatMessage({
                    id: 'admin.goal.indication.level_area',
                  })}
                </DefaultTitle>
              </Grid>
<<<<<<< HEAD
              {lastUpdate && (
                <Grid item xs={12} style={{ paddingTop: 0 }}>
                  <DefaultText
                    isContrast
                    lowercase
                    style={{ fontSize: 12, opacity: 0.8 }}
                  >
                    {intl
                      .formatMessage({ id: 'challenge.condition.last_update' })
                      .format(lastUpdate.toLocaleDateString(), lastUpdateTime)}
                    <span style={{ fontWeight: 'bold' }}>
                      {intl
                        .formatMessage({
                          id: 'challenge.condition.last_update_time',
                        })
                        .format(
                          lastUpdate.toLocaleDateString(),
                          lastUpdateTime
                        )}
                    </span>
                  </DefaultText>
                </Grid>
              )}
=======

>>>>>>> dev
              <Grid item xs={12}>
                <Card marginDisabled>
                  <Grid container direction='column' spacing={2}>
                    <Grid item>
                      <Grid container justify='space-between'>
                        <Grid item>
                          <Table backgroundDisabled>
                            <TableBody>
                              {goal.levels.map((level, index) => {
                                return (
                                  <TableRow key={level.id}>
                                    <TableCell>
                                      <TableChip label={index + 1} />
                                    </TableCell>
                                    <TableCell>
                                      <DefaultText noWrap>
                                        {'{0}%'.format(
                                          parseFloat(
                                            (level.percentage * 100).toFixed(2)
                                          )
                                        )}
                                      </DefaultText>
                                    </TableCell>
                                    <TableCell>
                                      <FontAwesomeIcon icon={faAngleRight} />
                                    </TableCell>
                                    <TableCell align='right'>
                                      <DefaultText noWrap>
                                        {'{0} PTS'.format(level.points)}
                                      </DefaultText>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </Grid>
                        <Grid item>
                          <AnimationController />
                        </Grid>
                      </Grid>
                    </Grid>
                    {customRepartitions && customRepartitions.length > 0 && (
                      <Grid item style={{ margin: '10px' }}>
                        <Grid container direction='column' spacing={1}>
                          <Grid item>
                            <DefaultTitle>
                              ⚠️ Paliers personnalisés&nbsp;
                              <Tooltip
                                title={customRepartitionsTooltip}
                                placement={'right'}
                              >
                                <BlueText
                                  style={{ width: 'fit-content' }}
                                  component={'span'}
                                >
                                  <FontAwesomeIcon icon={faInfoCircle} />
                                </BlueText>
                              </Tooltip>
                            </DefaultTitle>
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              direction='column'
                              spacing={2}
                            ></Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DefaultTitle isContrast>
                {intl.formatMessage({
                  id: 'admin.goal.indication.description_area',
                })}
              </DefaultTitle>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid container spacing={1} alignItems='center'>
                          <Grid item>
                            <DefaultTitle lowercase>{goal.name}</DefaultTitle>
                          </Grid>

                          {((goal.definition.kpi.custom && canEdit) ||
                            (goal.definition.kpi.custom &&
                              !canEdit &&
                              goal.definition.kpi.collaborator_editable &&
                              goal.end.toDate2().getTime() >
                                beginningOfLastMonth.getTime())) && (
                            <Grid
                              item
                              onClick={openKpiModal}
                              className={classes.link}
                            >
                              <FontAwesomeIcon
                                icon={faPencil}
                                style={{ marginRight: 5 }}
                              />
                              {intl.formatMessage({
                                id: 'challenge.kpi_results.edit_results',
                              })}
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <DefaultText>
                          <FontAwesomeIcon icon={faCalendarAlt} />{' '}
                          {intl
                            .formatMessage({
                              id: 'admin.goal.indication.period_text',
                            })
                            .format(
                              goal.start.toDate2().toLocaleDateString(),
                              goal.end.toDate2().toLocaleDateString()
                            )}
                        </DefaultText>
                      </Grid>

                      <Grid item xs={12}>
                        <Linkify>
                          <RichText
                            initial={JSON.parse(goal.definition.indication)}
                            readOnly={true}
                            onChange={() => {}}
                          />
                        </Linkify>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={5} md={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} zeroMinWidth>
                        <Grid container justify='flex-start'>
                          <Grid item>
                            <CardMedia
                              image={goal.icon}
                              className={classes.icon}
                            />
                          </Grid>
                          <Grid item>
                            <DefaultText noWrap>
                              {goal.definition.category.name}
                            </DefaultText>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <DefaultText>
                          <Grid container spacing={1} justify='flex-start'>
                            <Grid item>
                              <FontAwesomeIcon icon={faBalanceScale} />
                            </Grid>
                            <Grid item>
                              {goal.definition.kpi.unit.symbol
                                ? intl
                                    .formatMessage({
                                      id: 'admin.goal.indication.unit_with_symbol_text',
                                    })
                                    .format(
                                      goal.definition.kpi.unit.name,
                                      goal.definition.kpi.unit.symbol
                                    )
                                : intl
                                    .formatMessage({
                                      id: 'admin.goal.indication.unit_without_symbol_text',
                                    })
                                    .format(goal.definition.kpi.unit.name)}
                            </Grid>
                          </Grid>
                        </DefaultText>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={1} justify='flex-start'>
                          <Grid item>
                            <LiveStatus live={goal.definition.live} />
                          </Grid>
                          <Grid item>
                            <DefaultText>
                              {intl.formatMessage({
                                id: 'admin.goal.indication.live_label',
                              })}
                              &nbsp;
                              <Tooltip
                                title={intl.formatMessage({
                                  id: 'admin.goal.indication.live_info',
                                })}
                                placement={'right'}
                              >
                                <BlueText
                                  style={{ width: 'fit-content' }}
                                  component={'span'}
                                >
                                  <FontAwesomeIcon icon={faInfoCircle} />
                                </BlueText>
                              </Tooltip>
                            </DefaultText>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {!canEdit && <ReadonlyAdviceList advices={goal.advices} />}
          {canEdit && (
            <AdviceList advices={goal.advices} goal={goal} type={type} />
          )}
        </Grid>
      </Grid>
      <Dialog
        open={editResultsOpen}
        classes={{ paper: classes.kpiResultDialog }}
        onClose={() => closeKpiModal()}
      >
        <Hidden smDown>
          <IconButton
            size='small'
            onClick={() => closeKpiModal()}
            className={classes.dialogCloseIcon}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            size='small'
            onClick={() => closeKpiModal()}
            className={classes.dialogCloseIcon}
            style={{ top: 5, right: 5 }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </Hidden>
        <Grid
          container
          spacing={1}
          direction='column'
          style={{ marginTop: '0', width: '100%' }}
        >
          <Grid item style={{ width: '100%' }}>
            {(canEdit ||
              (_.get(goal, 'definition.kpi.collaborator_editable') &&
                goal.end.toDate2().getTime() >
                  beginningOfLastMonth.getTime())) && (
              <KpiResultUpdate
                kpi={goal.definition.kpi}
                onClose={() => closeKpiModal()}
                collaboratorEdit={_.get(account, 'role.code') === 'C'}
                start={parseInt(goal.start)}
                end={parseInt(goal.end)}
                participantIds={goal.participantIds}
                participantTeamIds={goal.participantTeamIds}
              />
            )}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorDataListActions: bindActionCreators(
    collaboratorDataListActions,
    dispatch
  ),
  collaboratorInputListActions: bindActionCreators(
    collaboratorInputListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GoalIndication));
