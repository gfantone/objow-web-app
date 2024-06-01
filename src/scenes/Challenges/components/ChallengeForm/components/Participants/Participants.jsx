import React from 'react';
import {
  DefaultTitle,
  TeamNode,
  TeamGroup,
  Collaborator,
  IconButton as MenuIconButton,
  Card,
  Loader,
} from '../../../../../../components';
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const styles = (theme) => {
  return {
    thumbnail: {
      borderRadius: 20,
    },
    panel: {
      backgroundColor: 'initial',
      borderRadius: 'initial',
      boxShadow: 'none',
      marginTop: 10,
      '& .MuiExpansionPanelSummary-content': {
        margin: 0,
        width: '100%',
        '&.Mui-expanded': {
          margin: '0 0 12px 0',
        },
      },
    },
    panelSummary: {
      padding: 'initial',
      position: 'relative',
      '& .MuiButtonBase-root': {
        position: 'absolute',
        right: 10,
        top: '50%',
        marginTop: -15,
      },
    },
    panelDetails: {
      padding: 'initial',
      paddingLeft: 20,
      // paddingBottom: 24,
    },
    activeColorPrimary: {
      color: theme.palette.primary.main,
    },
  };
};

const Participants = ({
  participants,
  teams,
  setParticipantsEditOpen,
  classes,
  challengeTypeCode,
  ...props
}) => {
  const intl = useIntl();

  const participantsByTeam = participants
    ? participants.reduce((acc, participant) => {
        const baseParticipant = participant.team
          ? participant.team
          : participant;
        const baseParent = participant.team ? 'team.' : '';
        //   // participants have 2 levels of team group
        //   if(_.get(participant, `${baseParent}parent.parent.id`)) {
        //     // Team group parent
        //     if(!acc[baseParticipant.parent.parent.id]) {
        //       acc[baseParticipant.parent.parent.id] = {children: {}, teamGroup: baseParticipant.parent.parent}
        //     }
        //
        //
        //     if(participant.fullname) {
        //       // Team group
        //       if(!acc[baseParticipant.parent.parent.id].children[baseParticipant.parent.id]) {
        //         acc[baseParticipant.parent.parent.id].children[baseParticipant.parent.id] = { children: {}, teamGroup:  baseParticipant.parent}
        //       }
        //
        //       // Team
        //       if(!acc[baseParticipant.parent.parent.id].children[baseParticipant.parent.id].children[baseParticipant.id]) {
        //         acc[baseParticipant.parent.parent.id].children[baseParticipant.parent.id].children[baseParticipant.id] = {children: [], team: baseParticipant, type: 'team'}
        //       }
        //
        //       acc[baseParticipant.parent.parent.id].children[baseParticipant.parent.id].children[baseParticipant.id].children = [...acc[baseParticipant.parent.parent.id].children[baseParticipant.parent.id].children[baseParticipant.id].children, participant]
        //     } else {
        //       // Team group
        //
        //       acc[baseParticipant.parent.parent.id].children[baseParticipant.parent.id] = { children: [], teamGroup:  baseParticipant.parent}
        //
        //       acc[baseParticipant.parent.parent.id].children[baseParticipant.parent.id].children = [...acc[baseParticipant.parent.parent.id].children[baseParticipant.parent.id].children, participant]
        //     }
        //
        //     return acc
        //
        //   // participants have 1 levels of team group
        // } else if (_.get(participant, `${baseParent}parent.id`)) {
        if (_.get(participant, `${baseParent}parent.id`)) {
          const isTeamChallenge = challengeTypeCode === 'CT';
          // Team group
          if (!acc[baseParticipant.parent.id]) {
            acc[baseParticipant.parent.id] = {
              children: isTeamChallenge ? [] : {},
              teamGroup: baseParticipant.parent,
            };
          }

          if (isTeamChallenge) {
            acc[baseParticipant.parent.id].children = [
              ...acc[baseParticipant.parent.id].children,
              participant,
            ];
            return acc;
          }

          // Team
          if (!acc[baseParticipant.parent.id].children[baseParticipant.id]) {
            acc[baseParticipant.parent.id].children[baseParticipant.id] = {
              children: [],
              team: baseParticipant,
              type: 'team',
            };
          }

          acc[baseParticipant.parent.id].children[baseParticipant.id].children =
            [
              ...acc[baseParticipant.parent.id].children[baseParticipant.id]
                .children,
              participant,
            ];

          return acc;
          // participants have no team group
        } else if (_.get(participant, `${baseParent}id`)) {
          if (!acc[baseParticipant.id]) {
            acc[baseParticipant.id] = {
              children: [],
              team: baseParticipant,
              type: 'team',
            };
          }
          acc[baseParticipant.id].children = [
            ...acc[baseParticipant.id].children,
            participant,
          ];

          return acc;
        }
        return acc;
      }, {})
    : {};

  const generateParticipantsByParent = (participantsByParent, root) => {
    return Object.keys(participantsByParent).map((parentKey) => {
      const nestedTeams =
        participantsByParent[parentKey].children &&
        !_.isArray(participantsByParent[parentKey].children)
          ? Object.keys(participantsByParent[parentKey].children).map(
              (key) => participantsByParent[parentKey].children[key]
            )
          : participantsByParent[parentKey].children;
      return (
        <Grid item xs={12} sm={root ? 6 : 12}>
          <ExpansionPanel className={classes.panel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.panelSummary}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Card className={classes.thumbnail}>
                    {participantsByParent[parentKey].type === 'team' ? (
                      <TeamNode
                        team={Object.assign(
                          {},
                          participantsByParent[parentKey].team,
                          {
                            collaborators:
                              participantsByParent[parentKey].children,
                          }
                        )}
                        hideAvatars
                      />
                    ) : (
                      <TeamGroup
                        team={Object.assign(
                          {},
                          participantsByParent[parentKey].teamGroup,
                          { teams: nestedTeams }
                        )}
                        hideTeamGroupUsers
                        teamNumber
                      />
                    )}
                  </Card>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panelDetails}>
              {_.isArray(participantsByParent[parentKey].children) ? (
                <Grid container spacing={2}>
                  {participantsByParent[parentKey].children.map((child) => {
                    const childKey = `C${child.id}`;
                    return (
                      <Grid item xs={12} key={childKey}>
                        {child.fullname ? (
                          <Collaborator key={childKey} collaborator={child} />
                        ) : (
                          <Card className={classes.thumbnail}>
                            <TeamNode
                              team={Object.assign({}, child, {
                                collaborators: child.collaborator_ids,
                              })}
                              hideAvatars
                            />
                          </Card>
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <React.Fragment>
                  {participantsByParent[parentKey].children && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        {generateParticipantsByParent(
                          participantsByParent[parentKey].children
                        )}
                      </Grid>
                    </Grid>
                  )}
                </React.Fragment>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      );
    });
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <DefaultTitle isContrast>
                {intl.formatMessage({
                  id: 'challenge.form.steps.participants',
                })}
              </DefaultTitle>
            </Grid>
            <Grid item>
              <DefaultTitle>
                <MenuIconButton
                  size={'small'}
                  onClick={setParticipantsEditOpen}
                  style={{
                    marginTop: '-4px',
                    fontSize: '18px',
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    className={classes.activeColorPrimary}
                  />
                </MenuIconButton>
              </DefaultTitle>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {!participants && (
              <Grid item xs={12}>
                <Loader centered />
              </Grid>
            )}
            {participants && (
              <React.Fragment>
                {challengeTypeCode === 'TG'
                  ? participants.map((participant) => (
                      <Grid item xs={12} sm={6}>
                        <Card className={classes.thumbnail}>
                          <TeamGroup
                            team={Object.assign({}, participant, {
                              teams:
                                participant.teamGroups &&
                                participant.teamGroups.length > 0
                                  ? participant.teamGroups
                                  : participant.allTeamIds,
                            })}
                            teamNumberWording={
                              participant.teamGroups &&
                              participant.teamGroups.length > 0
                                ? 'team_groups'
                                : 'teams'
                            }
                            hideTeamGroupUsers
                            teamNumber
                          />
                        </Card>
                      </Grid>
                    ))
                  : generateParticipantsByParent(participantsByTeam, true)}
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Participants);
