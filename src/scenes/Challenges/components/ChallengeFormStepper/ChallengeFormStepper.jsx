import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Awards, Goals, Infos, AwardType } from './components';
import {
  ProgressButton,
  Select,
  TransferList,
  TransferTreeList,
  Card,
  BlueText,
  Switch,
  Tooltip,
  BigText,
  ErrorText,
  Loader,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const ChallengeFormStepper = ({
  actionLoading,
  awardTypes,
  rewardTypes,
  categories,
  images,
  isCreation,
  isDuplication,
  isUpdate,
  kpis,
  units,
  period,
  team,
  teamGroup,
  types,
  goalAdding,
  onGoalAdded,
  currentStep,
  isLastStep,
  handleNextStep,
  handlePreviousStep,
  challenge,
  setStart,
  setEnd,
  setType,
  setParticipants,
  setAwardType,
  handleAddGoal,
  setNewKpiOpen,
  setConfigRewardOpen,
  rewardImages,
  rewardCategories,
  awardError,
  dupplication,
  participantsChoiceExpanded,
  ...props
}) => {
  const intl = useIntl();
  const id = challenge.id || null;
  const name = challenge.name || null;
  const description = challenge.description || null;
  const start = challenge.start || null;
  const end = challenge.end || null;
  const type = challenge.type || null;
  const image = challenge.image || null;
  const customImage = challenge.customImage || null;
  const awardType = challenge.awardType ? challenge.awardType : null;
  const rewardType = challenge.rewardType ? challenge.rewardType : null;
  const awards = challenge.awards || [];
  const goals = challenge.goals || null;
  const live = challenge.live || null;
  const participants = challenge.participants || [];

  const typeObject = types.find(
    (x) => x.code === challenge.typeCode || x.id === challenge.type
  );

  const typeId = typeObject ? typeObject.id : null;
  const typeCode = typeObject ? typeObject.code : null;
  var finalTypes = types;
  const { account } = props.accountDetail;

  const isTeamGroupType = typeObject && typeObject.code === 'TG';
  const isMobile = isWidthDown('xs', props.width);

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

  function handleStartChange(newStart) {
    setStart(newStart);
  }

  function handleTypeChange(newType) {
    setParticipants([], () => {
      setType(Number(newType));
    });
  }
  const maxAwardType = awardTypes[0].id;
  const finalInitialType = awardType ? awardType : maxAwardType;
  const isMaxAward = parseInt(awardType) === maxAwardType;
  let fields;
  let title;
  const currentAwardType = awardTypes.find(
    (at) => at.id === parseInt(awardType)
  );

  switch (currentStep.order) {
    case 1:
      title = intl.formatMessage({ id: 'challenge.form.participants_title' });
      fields = (
        <Grid item xs={12}>
          <Grid container direction='column' spacing={2}>
            {!!(participants || !dupplication) && (
              <React.Fragment>
                <Grid item xs={12}>
                  <Grid container justify='center'>
                    <Grid item xs={4}>
                      {(typeId || !dupplication) && (
                        <Select
                          isContrast
                          disabled={isUpdate}
                          fullWidth
                          initial={typeId}
                          label={intl.formatMessage({
                            id: 'challenge.form.info_type_label',
                          })}
                          name='type'
                          options={types.map((t) =>
                            Object.assign({}, t, {
                              name: intl.formatMessage({
                                id: `challenge.types.${t.code}`,
                              }),
                            })
                          )}
                          optionTextName='name'
                          optionValueName='id'
                          required
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                          }}
                          onChange={handleTypeChange}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                {type && (
                  <Grid item>
                    <Card>
                      <TransferList
                        listIn={teamGroup}
                        teamGroupMode={_.get(typeObject, 'code') === 'TG'}
                        enableCollaboratorSelect={
                          _.get(typeObject, 'code') === 'CC'
                        }
                        enableTeamSelect={_.includes(
                          ['CC', 'CT'],
                          _.get(typeObject, 'code')
                        )}
                        onChange={setParticipants}
                        selected={participants}
                        defaultChoicesExpanded={participantsChoiceExpanded}
                      />
                    </Card>
                  </Grid>
                )}
              </React.Fragment>
            )}

            {!(participants && participants.length > 0) && dupplication && (
              <Loader centered />
            )}
          </Grid>
        </Grid>
      );
      break;
    case 2:
      title = intl.formatMessage({ id: 'challenge.form.mode_title' });
      const participantsNumber = _.includes(
        ['CC', 'TG'],
        _.get(typeObject, 'code')
      )
        ? participants.length
        : _.uniq(participants.map((p) => p.team)).length;

      fields = (
        <Grid item xs={12}>
          <AwardType
            types={awardTypes}
            typesData={typesData}
            currentType={awardType}
            setType={setAwardType}
            participantsNumber={participantsNumber}
            participantType={typeObject}
          />
        </Grid>
      );
      break;
    case 3:
      // fields = <Grid item xs={12}>
      // </Grid>
      // break;
      title = intl.formatMessage({ id: 'challenge.form.infos_title' });
      fields = (
        <Grid item xs={12}>
          <Infos
            description={description}
            end={end}
            image={image}
            customImage={customImage}
            images={images}
            name={name}
            period={period}
            start={start}
            type={type}
            types={finalTypes}
            onEndChange={handleEndChange}
            onStartChange={handleStartChange}
          />
        </Grid>
      );
      break;
    case 4:
      // fields = <Grid item xs={12}>
      // </Grid>
      // break;

      title = intl.formatMessage({ id: 'challenge.form.indicators_title' });
      fields = (
        <Grid item xs={12}>
          <Goals
            categories={categories}
            goals={goals}
            kpis={kpis}
            units={units}
            goalAdding={goalAdding}
            onGoalAdded={onGoalAdded}
            period={period}
            start={start}
            onEndChange={handleEndChange}
            onStartChange={handleStartChange}
            handleAddGoal={handleAddGoal}
            end={end}
            setNewKpiOpen={setNewKpiOpen}
            awardType={currentAwardType}
          />
        </Grid>
      );
      break;
    case 5:
      // fields = <Grid item xs={12}>
      // </Grid>
      // break;
      // console.log(awardType);
      title = intl.formatMessage({ id: 'challenge.form.rewards_title' });

      const availableRewardTypes = rewardTypes.filter(
        (rt) =>
          typesData[currentAwardType.code].availableReward.indexOf(
            rt.code === 'G' ? 'gift' : 'points'
          ) >= 0
      );
      fields = (
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
            <ErrorText style={{ textAlign: 'center' }}>
              {intl.formatMessage({ id: 'challenge.form.award_error' })}
            </ErrorText>
          )}
        </Grid>
      );
      break;
    // case 6:
    //   title = 'Sélection des options'
    //   fields = <Grid item xs={12}>
    //     {isMaxAward && <Card>
    //         <Grid container alignItems='center'>
    //             <Grid item>
    //                 <Switch name='live' label={intl.formatMessage({id: "challenge.award_list.list_live_label"})} initial={live} />
    //             </Grid>
    //             <Grid item>
    //                 <Tooltip title={intl.formatMessage({id: "challenge.award_list.list_live_infos"})}>
    //                     <BlueText>
    //                         <FontAwesomeIcon icon={faInfoCircle} />
    //                     </BlueText>
    //                 </Tooltip>
    //             </Grid>
    //           </Grid>
    //       </Card>}
    //   </Grid>
    //   break;
    case 6:
      title = '';
      fields = (
        <Grid item xs={12}>
          <Card>
            <div style={{ textAlign: 'center', margin: 'auto' }}>
              <p style={{ fontSize: 19, color: '#555555' }}>
                {intl.formatMessage({ id: 'challenge.form.congratulations' })}
              </p>
              <p style={{ fontSize: 19, color: '#555555' }}>
                {intl.formatMessage({
                  id: 'challenge.form.congratulations_message',
                })}
              </p>
            </div>
          </Card>
        </Grid>
      );
      break;
  }

  return (
    <div>
      <Grid container spacing={4} style={{ paddingBottom: isMobile ? 40 : 0 }}>
        <Grid item style={{ textAlign: 'center', width: '100%' }}>
          <BigText isContrast>{title}</BigText>
        </Grid>
        {fields}
        {!isMobile && (
          <Grid item xs={12}>
            <Grid container spacing={4} direction='row' justify='center'>
              {currentStep.order > 1 && (
                <Grid item>
                  <ProgressButton
                    onClick={(e) => {
                      e.preventDefault();
                      handlePreviousStep();
                    }}
                    color='secondary'
                    text={intl.formatMessage({ id: 'common.previous' })}
                    centered
                  />
                </Grid>
              )}
              {!isLastStep && (
                <Grid item>
                  <ProgressButton
                    text={intl.formatMessage({ id: 'common.next' })}
                    centered
                    disabled={
                      !(participants && participants.length > 0) && dupplication
                    }
                  />
                </Grid>
              )}
              {isLastStep && (
                <Grid item>
                  <ProgressButton
                    text={intl.formatMessage({ id: 'common.submit' })}
                    loading={actionLoading}
                    centered
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withWidth()(ChallengeFormStepper));
