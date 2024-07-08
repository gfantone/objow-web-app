import React, { useEffect } from "react";
import * as currentCollaboratorBadgeSummaryListActions from "../../../services/CollaboratorBadges/CurrentCollaboratorBadgeSummaryList/actions";
import * as currentPeriodDetailActions from "../../../services/Periods/CurrentPeriodDetail/actions";
import * as badgeListActions from "../../../services/Badges/BadgeList/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DefaultText, EmptyState, WrapperWidget } from "../../../components";
import { Badge } from "../../../scenes/Collaborators/scenes/CollaboratorDetail/components";
import { Grid, withStyles, makeStyles } from "@material-ui/core";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import _ from "lodash";

const style = (theme) => {
  return {
    emptyState: {
      width: "70%",
      margin: "auto",
    },
    spanBadge: {
      fontWeight: "bold",
      textTransform: "none",
      color: theme.palette.primary.main,
    },
  };
};

const BadgeWidget = ({
  badges,
  loading,
  currentCollaboratorBadgeSummaryListActions,
  currentPeriodDetailActions,
  badgeListActions,
  account,
  period,
  adminBadges,
  classes,
}) => {
  const intl = useIntl();
  const numberBadges = `${badges?.length} ${intl
    .formatMessage({ id: "badge.title" })
    .toLowerCase()}`;

  const numberAdminBadges = `${adminBadges?.length} ${intl
    .formatMessage({ id: "badge.title" })
    .toLowerCase()}`;

  useEffect(() => {
    if (
      account.role.code === "A" ||
      account.role.code === "M" ||
      account.role.code === "S"
    ) {
      currentPeriodDetailActions.getCurrentPeriodDetail();
    }
  }, []);

  useEffect(() => {
    if (
      account.role.code === "A" ||
      account.role.code === "M" ||
      account.role.code === "S"
    ) {
      if (period && !adminBadges) {
        badgeListActions.getBadgeList(period.id, {
          simple: true,
          withLevels: true,
        });
      }
    } else if (account.role.code === "C") {
      currentCollaboratorBadgeSummaryListActions.getCurrentCollaboratorBadgeSummaryList(
        account.id
      );
    }
  }, [account.role.code, period, adminBadges]);

  return (
    <WrapperWidget
      loading={
        (account.role.code === "C" && (!badges || loading)) ||
        (account.role.code !== "C" && (!adminBadges || loading))
      }
      url={
        account.role.code === "C"
          ? `/collaborators/${account.id}/detail`
          : `/badges`
      }
      title={intl.formatMessage({ id: "badge.title" })}
    >
      {account.role.code === "A" ||
      account.role.code === "M" ||
      account.role.code === "S" ? (
        <div style={{ height: 300 }}>
          <DefaultText
            lowercase
            align="center"
            style={{ fontSize: 16, marginTop: 15 }}
          >
            <span className={classes.spanBadge}>{numberAdminBadges}</span>{" "}
            {intl.formatMessage({ id: "widget.badge.count2" })}
          </DefaultText>
          {adminBadges === 0 ? (
            <Grid
              container
              style={{
                padding: 5,
                width: "100%",
                height: "100%",
              }}
              alignItems="center"
            >
              <Grid item xs>
                <EmptyState rootClass={classes.emptyState} />
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              style={{ padding: 20 }}
            >
              {adminBadges &&
                _.shuffle(adminBadges)
                  .slice(0, 4)
                  .map((badge) => (
                    <Grid item xs={6} style={{ paddingBottom: 15 }}>
                      <Badge key={badge.id} badge={badge} />
                    </Grid>
                  ))}
            </Grid>
          )}
        </div>
      ) : (
        <div style={{ height: 330 }}>
          <DefaultText
            lowercase
            align="center"
            style={{ fontSize: 16, marginTop: 15 }}
          >
            {intl.formatMessage({ id: "widget.badge.count1" })}{" "}
            <span className={classes.spanBadge}>{numberBadges}</span>{" "}
            {intl.formatMessage({ id: "widget.badge.count2" })}
          </DefaultText>
          {badges === 0 ? (
            <Grid
              container
              style={{
                padding: 5,
                width: "100%",
                height: "100%",
              }}
              alignItems="center"
            >
              <Grid item xs>
                <EmptyState rootClass={classes.emptyState} />
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              style={{ padding: 20 }}
            >
              {badges?.slice(0, 4).map((badge) => (
                <Grid item xs={6} style={{ paddingBottom: 15 }}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={`/badges/detail/${badge.levelId}`}
                  >
                    <Badge key={badge.id} badge={badge} />
                  </NavLink>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      )}
    </WrapperWidget>
  );
};

const mapStateToProps = ({
  currentCollaboratorBadgeSummaryList,
  accountDetail,
  currentPeriodDetail,
  badgeList,
}) => ({
  badges: currentCollaboratorBadgeSummaryList.badges,
  loading: currentCollaboratorBadgeSummaryList.loading,
  account: accountDetail.account,
  period: currentPeriodDetail.period,
  adminBadges: badgeList.badges,
});

const mapDispatchToProps = (dispatch) => ({
  currentCollaboratorBadgeSummaryListActions: bindActionCreators(
    currentCollaboratorBadgeSummaryListActions,
    dispatch
  ),
  currentPeriodDetailActions: bindActionCreators(
    currentPeriodDetailActions,
    dispatch
  ),
  badgeListActions: bindActionCreators(badgeListActions, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(BadgeWidget));
