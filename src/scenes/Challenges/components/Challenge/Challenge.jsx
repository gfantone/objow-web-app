import React, { useState } from "react";
import { Grid, CardMedia, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { AvatarGroup } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { faFireAlt, faLock } from "@fortawesome/free-solid-svg-icons";
import { ChallengeImage, ChallengeType, ChallengeReward } from "..";
import {
  DefaultText,
  InfoText,
  TimerTag,
  BoldTitle,
  Avatar,
  Card,
  AccentText,
  Tooltip,
} from "../../../../components";
import { useIntl } from "react-intl";
import _ from "lodash";

const styles = (theme) => {
  return {
    challengeImage: {
      height: "600px",
    },
    imageContainer: {
      position: "relative",
    },
    timerContainer: {
      position: "absolute",
      right: 0,
      top: 16,
    },
    avatarGroup: {
      marginLeft: "-2px",
      flexWrap: "wrap",

      height: 35,
      overflow: "hidden",
    },
    avatar: {
      width: 35,
      height: 35,
    },
    bigText: {
      fontSize: 18,
    },
    smallText: {
      fontSize: 15,
    },
    challengeType: {
      lineHeight: 35,
      verticalAlign: "center",
      whiteSpace: "nowrap",
    },
    tooltip: {
      minWidth: 320,
    },
    transparentTooltip: {
      background: "transparent",
    },
    accentText: {
      position: "absolute",
      top: -5,
      left: 15,
      color: theme.palette.primary.main,
      zIndex: 100,
    },
    circularProgress: {
      width: 20,
      height: 20,
      marginLeft: 10,
      color: theme.palette.primary.main,
      marginBottom: -5,
    },
  };
};

const Challenge = ({
  challenge,
  scoreByTeam,
  fetchWonAwards,
  fetchCurrentRank,
  fetchGoalPoints,
  fetchTopParticipants,
  ...props
}) => {
  const intl = useIntl();
  const { classes, configs } = props;
  const { account } = props.accountDetail;
  const [wonAwards, setWonAwards] = useState(
    fetchWonAwards ? null : challenge.wonAwards
  );
  const [rank, setRank] = useState(fetchCurrentRank ? null : challenge.rank);
  const [wonAwardsLoading, setWonAwardsLoading] = useState(false);
  const [rankLoading, setRankLoading] = useState(false);
  const [initialized, setInitialized] = useState();
  const [goalPoints, setGoalPoints] = useState();
  const [topParticipants, setTopParticipants] = useState();

  const allowRank = account.hasChallengeRankAccess;

  if (!initialized) {
    setInitialized(true);
    if (fetchWonAwards) {
      setWonAwardsLoading(true);
      fetchWonAwards(_.get(challenge, "id"))
        .then((results) => {
          setWonAwardsLoading(false);
          setWonAwards(results.data);
        })
        .catch(() => {
          setWonAwardsLoading(false);
        });
    }
    if (fetchCurrentRank) {
      setRankLoading(true);
      fetchCurrentRank(_.get(challenge, "id"))
        .then((results) => {
          setRankLoading(false);
          setRank(results.data);
        })
        .catch(() => {
          setRankLoading(false);
        });
    }
    if (fetchGoalPoints) {
      fetchGoalPoints(_.get(challenge, "sourceId")).then((results) => {
        setGoalPoints(results.data);
      });
    }
    if (fetchTopParticipants) {
      fetchTopParticipants(_.get(challenge, "sourceId")).then((results) => {
        setTopParticipants(results.data);
      });
    }
  }

  const hasParticipants = !_.isEmpty(topParticipants);

  const coinImage = require(`../../../../assets/img/system/challenge/icons/coin.png`);
  const giftImage = require(`../../../../assets/img/system/challenge/icons/gift.png`);

  const displayTitle =
    configs &&
    _.get(
      configs.find((c) => c.code === "CTTA"),
      "value",
      "false"
    ).toBoolean();
  const displayRank = rank && allowRank;

  const challengeTypeInfos = {
    CT: {
      rank: (
        <span>
          <span style={{ fontWeight: "bold" }}>{challenge.participants}</span>{" "}
          {intl.formatMessage({ id: "challenge.teams" }).format("")}
        </span>
      ),
    },
    TP: {
      rank: (
        <span>
          <span style={{ fontWeight: "bold" }}>{challenge.participants}</span>{" "}
          {intl.formatMessage({ id: "challenge.teams" }).format("")}
        </span>
      ),
    },
    CC: {
      rank: (
        <span>
          <span>
            {challenge.totalParticipants &&
            challenge.participants !== challenge.totalParticipants ? (
              <span>
                <span style={{ fontWeight: "bold" }}>
                  {challenge.participants}
                </span>{" "}
                / {challenge.totalParticipants}
              </span>
            ) : (
              <span style={{ fontWeight: "bold" }}>
                {challenge.participants}
              </span>
            )}
          </span>
          {intl.formatMessage({ id: "challenge.collaborators" }).format("")}
        </span>
      ),
    },
    TG: {
      rank: (
        <span>
          <span style={{ fontWeight: "bold" }}>{challenge.participants}</span>{" "}
          {intl.formatMessage({ id: "challenge.team_groups" }).format("")}
        </span>
      ),
    },
  };
  const isTeamGroupChallenge = challenge.typeCode === "TG";
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.imageContainer}>
            <div className={classes.timerContainer}>
              <TimerTag date={challenge.end} />
            </div>
            <ChallengeImage
              image={challenge.custom_image || challenge.image}
              style={{ height: hasParticipants ? "" : "189px" }}
            />
          </div>
        </Grid>
        <Grid item style={{ width: "100%" }}>
          <Grid container spacing={1} direction='column'>
            {displayTitle && (
              <Grid item>
                <BoldTitle lowercase style={{ lineHeight: 1 }}>
                  {challenge.name}
                </BoldTitle>
              </Grid>
            )}
            {!isTeamGroupChallenge && (
              <Grid item style={{ maxHeight: "27px" }}>
                <Grid
                  container
                  spacing={2}
                  style={{ alignItems: "baseline" }}
                  direction='row'
                >
                  <Grid item>
                    <DefaultText lowercase className={classes.smallText}>
                      {!rankLoading && displayRank && (
                        <div>
                          <span style={{ fontWeight: "bold", fontSize: 15 }}>
                            {rank == 1
                              ? intl
                                  .formatMessage({ id: "challenge.first_rank" })
                                  .format(rank)
                              : intl
                                  .formatMessage({ id: "challenge.other_rank" })
                                  .format(rank)}
                          </span>
                          <InfoText
                            component='span'
                            className={classes.smallText}
                          >
                            {" "}
                            / {challenge.participants}
                          </InfoText>
                        </div>
                      )}
                      {!rankLoading && !displayRank && (
                        <div>
                          &nbsp;
                          {challengeTypeInfos[challenge.typeCode].rank}
                        </div>
                      )}
                      {rankLoading && allowRank && (
                        <span>
                          <CircularProgress
                            className={classes.circularProgress}
                          />
                        </span>
                      )}
                    </DefaultText>
                  </Grid>
                  {/* enable_manager_score is undefined for collaborator challenges */}
                  {challenge.enable_manager_score !== false && (
                    <Grid item>
                      <DefaultText lowercase className={classes.smallText}>
                        &nbsp;
                        <span style={{ fontWeight: "bold" }}>
                          {intl
                            .formatMessage({ id: "challenge.points" })
                            .format("")}
                        </span>
                        {goalPoints && parseFloat(goalPoints).toLocaleString()}
                      </DefaultText>
                    </Grid>
                  )}
                  {wonAwardsLoading && (
                    <Grid item>
                      <CircularProgress className={classes.circularProgress} />
                    </Grid>
                  )}
                  {wonAwards && (
                    <Grid item>
                      <Grid container spacing={1}>
                        <Grid item>
                          <DefaultText
                            lowercase
                            style={{ fontSize: 15, fontWeight: "bold" }}
                          >
                            {intl.formatMessage({
                              id: "challenge.awards_title",
                            })}{" "}
                            :
                          </DefaultText>
                        </Grid>
                        {wonAwards.length === 0 && (
                          <Grid item style={{ position: "relative" }}>
                            <Tooltip
                              title={
                                <span style={{ fontSize: 13 }}>
                                  {intl.formatMessage({
                                    id: "challenge.no_awards_title",
                                  })}
                                </span>
                              }
                            >
                              <div>
                                <AccentText
                                  lowercase
                                  className={classes.accentText}
                                >
                                  <FontAwesomeIcon icon={faLock} />
                                </AccentText>
                                <div style={{ filter: "grayscale(1)" }}>
                                  {_.get(challenge, "rewardTypeCode") ===
                                  "G" ? (
                                    <CardMedia
                                      image={giftImage}
                                      style={{
                                        height: 18,
                                        width: 18,
                                        marginRight: 5,
                                      }}
                                    />
                                  ) : (
                                    <CardMedia
                                      image={coinImage}
                                      style={{
                                        height: 18,
                                        width: 18,
                                        marginRight: 5,
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            </Tooltip>
                          </Grid>
                        )}
                        {wonAwards.length > 0 && (
                          <React.Fragment>
                            {wonAwards[0].reward ? (
                              <Grid item>
                                <Tooltip
                                  className={`${classes.tooltip} ${classes.transparentTooltip}`}
                                  title={
                                    <div style={{ minWidth: 320 }}>
                                      <Card>
                                        <ChallengeReward
                                          reward={wonAwards[0].reward}
                                        />
                                      </Card>
                                    </div>
                                  }
                                >
                                  <CardMedia
                                    image={giftImage}
                                    style={{
                                      height: 18,
                                      width: 18,
                                      marginRight: 5,
                                    }}
                                  />
                                </Tooltip>
                              </Grid>
                            ) : (
                              <Grid item>
                                <Tooltip
                                  title={
                                    <Grid
                                      container
                                      spacing={1}
                                      style={{ fontSize: 13 }}
                                    >
                                      <Grid item>{wonAwards[0].points}</Grid>
                                      <Grid item>
                                        <CardMedia
                                          image={coinImage}
                                          style={{
                                            height: 15,
                                            width: 15,
                                            marginTop: -1,
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                  }
                                >
                                  <CardMedia
                                    image={coinImage}
                                    style={{
                                      height: 18,
                                      width: 18,
                                      marginRight: 5,
                                    }}
                                  />
                                </Tooltip>
                              </Grid>
                            )}
                          </React.Fragment>
                        )}
                      </Grid>
                    </Grid>
                  )}
                  {!hasParticipants && (
                    <Grid item style={{ marginLeft: "auto" }}>
                      <DefaultText className={classes.smallText}>
                        <ChallengeType type={challenge.typeCode} />
                      </DefaultText>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
            <Grid item>
              <Grid
                container
                spacing={1}
                direction='row'
                style={{ flexWrap: "noWrap" }}
              >
                {hasParticipants && allowRank && (
                  <React.Fragment>
                    <Grid item style={{ width: "100%" }}>
                      <AvatarGroup className={classes.avatarGroup} max={15}>
                        {topParticipants.map((participant, index) => (
                          <Avatar
                            src={_.get(participant, "collaborator.photo")}
                            entityId={_.get(participant, "collaborator.id")}
                            className={classes.avatar}
                            fallbackName={
                              _.get(participant, "collaborator.photo")
                                ? ""
                                : _.get(participant, "collaborator.fullname") ||
                                  _.get(participant, "collaborator.rank") ||
                                  index + 1
                            }
                            backgroundColor={
                              challenge.typeCode === "CT" ||
                              challenge.typeCode === "TG"
                                ? "white"
                                : null
                            }
                            color={
                              challenge.typeCode === "CT" ||
                              challenge.typeCode === "TG"
                                ? "#555"
                                : null
                            }
                            borderColor={
                              challenge.typeCode === "CT"
                                ? _.get(participant, "team.color.hex")
                                : null
                            }
                            tooltip={
                              _.get(participant, "collaborator.fullname") ||
                              _.get(participant, "team.name") ||
                              _.get(participant, "team_group.name")
                            }
                          />
                        ))}
                      </AvatarGroup>
                    </Grid>
                    <Grid item className={classes.challengeType}>
                      <DefaultText
                        align='right'
                        style={{ display: "flex", lineHeight: "2.5" }}
                      >
                        <span style={{ marginRight: "2px" }}>
                          <ChallengeType type={challenge.typeCode} />
                        </span>
                        <span>
                          {intl.formatMessage({
                            id: `challenge.types.${challenge.typeCode}`,
                          })}
                        </span>
                      </DefaultText>
                    </Grid>
                  </React.Fragment>
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

export default connect(mapStateToProps)(withStyles(styles)(Challenge));
