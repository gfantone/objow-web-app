import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Awards, Goals, Infos, Participants, Options } from './components';
import {
  ProgressButton,
  ErrorText,
  DefaultTitle,
  IconButton as MenuIconButton,
  Loader,
  Card, TeamGroup, TransferList
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => {
  return {
    activeColorPrimary: {
      color: theme.palette.primary.main,
    },
  };
};

const ChallengeForm = ({
  actionLoading,
  awardTypes,
  rewardTypes,
  categories,
  challenge,
  images,
  isCreation,
  isDuplication,
  isUpdate,
  kpis,
  units,
  period,
  team,
  types,
  goalAdding,
  onGoalAdded,
  addGoal,
  teams,
  teamGroup,
  setParticipantsPerso,
  onUpdateTeamPerso,
  onPersonalizedTeamOpen,
  classes,
  setConfigRewardOpen,
  rewardImages,
  rewardCategories,
  handleChangeParticipants,
  setParticipantsEditOpen,
  newParticipants,
  participantsPersonalized,
  awardError,
  setNewKpiOpen,
  ...props
}) => {
  const intl = useIntl();
  const id = challenge ? challenge.id : null;
  const name = challenge ? challenge.name : null;
  const description = challenge ? challenge.description : null;
  const [start, setStart] = React.useState(
    challenge && !isDuplication ? challenge.start.toDate2() : null
  );
  const [end, setEnd] = React.useState(
    challenge && !isDuplication ? challenge.end.toDate2() : null
  );
  const [type, setType] = React.useState(challenge ? challenge.type.id : null);
  const typeObject = types.find((x) => x.id === type);
  const typeId = typeObject ? typeObject.id : null;
  const typeCode = typeObject ? typeObject.code : null;
  const image = challenge ? _.get(challenge, 'image.id') : null;
  const customImage = challenge ? challenge.customImage : null;
  const awardType = challenge ? challenge.award_type : null;
  const rewardType = challenge ? challenge.reward_type : null;
  const awards = challenge ? challenge.awards : [];
  const goals = challenge ? challenge.goals : null;
  const live = challenge ? challenge.live : null;

  const getTeamPersonalizedByCollaboratorList = (allTeamsChallenge) => {
    let teamsPerso = []
    if (allTeamsChallenge) {
      allTeamsChallenge.forEach((teamPerso) => {
        let collaborators = [];
        teams.forEach((team) => {
          if (team.collaborators) {
            team.collaborators.forEach((c) => {
              if (teamPerso.collaborator_ids.indexOf(c.id) >= 0) {
                collaborators.push(c);
              }
            })
          }
        })
        teamPerso.collaborators = collaborators;
        teamsPerso.push(teamPerso);
      })
    }
    setParticipantsPerso(teamsPerso, () => {
      return participantsPersonalized;
    })
  };

  let participants = null;
  if (typeCode === 'TP') {
    participants = participantsPersonalized ? participantsPersonalized
      : challenge && challenge.participants ? getTeamPersonalizedByCollaboratorList(challenge.participants) : null;
  } else {
    participants = challenge ? challenge.participants : null;
  }
  var finalTypes = types;
  const { account } = props.accountDetail;

  const isTeamGroupType = typeObject && (typeObject.code === 'TG'  || typeObject.code === 'TP');

  const typesData = {
    R: {
      minimumParticipants: 2,
      order: 1,
      icon: require(`../../../../assets/img/system/challenge/icons/Ribbons.png`),
      availableReward: isTeamGroupType ? ['gift'] : ['points', 'gift'],
    },
    M: {
      order: 2,
      disabled: isTeamGroupType,
      icon: require(`../../../../assets/img/system/challenge/icons/Rocket.png`),
      availableReward: ['points'],
    },
    P: {
      order: 3,
      icon: require(`../../../../assets/img/system/challenge/icons/Levels.png`),
      availableReward: isTeamGroupType ? ['gift'] : ['points', 'gift'],
    },
    C: {
      order: 4,
      icon: require(`../../../../assets/img/system/challenge/icons/race.png`),
      availableReward: isTeamGroupType ? ['gift'] : ['gift', 'points'],
    },
  };

  const currentAwardType = awardTypes.find(
    (at) => at.id === parseInt(awardType)
  );
  const availableRewardTypes = rewardTypes.filter(
    (rt) =>
      typesData[currentAwardType.code].availableReward.indexOf(
        rt.code === 'G' ? 'gift' : 'points'
      ) >= 0
  );

  if (!isUpdate) {
    if (account.role.code === 'M') {
      finalTypes = finalTypes.filter((x) => x.code === 'CM');
    } else if (
      (account.role.code === 'A' || account.role.code === 'S') &&
      !team
    ) {
      finalTypes = finalTypes.filter((x) => x.code !== 'CM');
    }
  }

  const hasChallengeManager = finalTypes.find((x) => x.code === 'CM') != null;

  function handleEndChange(newEnd) {
    setEnd(newEnd);
  }

  function handleUpdateTeamPerso(teamId) {
    onUpdateTeamPerso(teamId);
  }

  function handleStartChange(newStart) {
    setStart(newStart);
  }

  function handleTypeChange(newType) {
    setType(Number(newType));
  }

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Infos
            description={description}
            end={end}
            image={image}
            customImage={customImage}
            images={images}
            isUpdate={isUpdate}
            name={name}
            period={period}
            start={start}
            type={type}
            types={finalTypes}
            onEndChange={handleEndChange}
            onStartChange={handleStartChange}
            onTypeChange={handleTypeChange}
            awardTypes={awardTypes}
            awardType={awardType}
          />
        </Grid>
        <Grid item xs={12}>
          <Goals
            categories={categories}
            goals={goals}
            challengeTypeCode={typeCode}
            kpis={kpis}
            units={units}
            goalAdding={goalAdding}
            onGoalAdded={onGoalAdded}
            addGoal={addGoal}
            setNewKpiOpen={setNewKpiOpen}
            awardType={currentAwardType}
          />
        </Grid>
        <Grid item xs={12}>
          <Awards
            challengeId={id}
            challengeTypeCode={typeCode}
            challengeTypeId={typeId}
            end={end}
            hasChallengeManager={hasChallengeManager}
            initialAwards={awards}
            initialLive={live}
            initialType={awardType}
            initialRewardType={rewardType}
            isCreation={isCreation}
            isDuplication={isDuplication}
            isUpdate={isUpdate}
            start={start}
            team={team}
            types={awardTypes}
            rewardTypes={availableRewardTypes}
            setConfigRewardOpen={setConfigRewardOpen}
            rewardImages={rewardImages}
            rewardCategories={rewardCategories}
          />
          {awardError && (
            <ErrorText>
              {intl.formatMessage({ id: 'challenge.form.award_error' })}
            </ErrorText>
          )}
        </Grid>
        <Grid item xs={12}>
          <Options
            enable_manager_score={
              challenge ? challenge.enable_manager_score : false
            }
            player_visible_ranks={
              challenge ? challenge.player_visible_ranks : null
            }
            notify_updated={challenge ? challenge.notify_updated : false}
          />
        </Grid>
        <Grid item xs={12}>
          { typeCode !== 'TP' && (
            <Participants
              participants={newParticipants || participants}
              teams={teams}
              handleChangeParticipants={handleChangeParticipants}
              setParticipantsEditOpen={setParticipantsEditOpen}
              challengeTypeCode={_.get(typeObject, 'code')}
            />
          )}
          { typeCode === 'TP' && (
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
                          onClick={onPersonalizedTeamOpen}
                          style={{
                            marginTop: '-4px',
                            fontSize: '18px',
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            className={classes.activeColorPrimary}
                          />
                        </MenuIconButton>
                      </DefaultTitle>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {(!participants || participants.length === 0) && (
                      <Grid item xs={12}>
                        <Loader centered/>
                      </Grid>
                    )}
                    {participants && participants.length > 0 && (
                        <Grid item xs={12}>
                          <Card>
                            <TransferList
                              listIn={teamGroup}
                              teamGroupMode={_.get(typeObject, 'code') === 'TG'}
                              teamPersonalizedMode={_.get(typeObject, 'code') === 'TP'}
                              noSelection={_.get(typeObject, 'code') === 'TP'}
                              enableCollaboratorSelect={
                                _.get(typeObject, 'code') === 'CC' || _.get(typeObject, 'code') === 'TP'
                              }
                              enableTeamSelect={_.includes(
                                ['CC', 'CT', 'TP'],
                                _.get(typeObject, 'code')
                              )}
                              onChange={setParticipantsPerso}
                              selected={participants}
                              defaultChoicesExpanded={false}
                              onUpdateTeam={handleUpdateTeamPerso}
                            />
                          </Card>
                          {/*)}*/}
                        </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </Grid>

        <Grid item xs={12}>
          <ProgressButton
            centered
            loading={actionLoading}
            text={intl.formatMessage({id: 'common.submit'})}
            type='submit'
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({accountDetail}) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(ChallengeForm));
