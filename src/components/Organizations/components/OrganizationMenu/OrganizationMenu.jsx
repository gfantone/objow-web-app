import React, {
  useState,
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { connect } from "react-redux";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Tree, TreeNode } from "react-organizational-chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";
import { useIntl } from "react-intl";
import { OrganizationNode } from "../";
import api from "../../../../data/api/api";
import {
  DefaultText,
  IconButton,
  DefaultTitle,
  TeamNode,
  TeamGroup,
  Card,
  Loader,
} from "../../../";
import _ from "lodash";

const styles = (theme) => {
  return {
    thumbnail: {
      borderRadius: 20,
      zIndex: 10,
    },
    contentWrapper: {
      marginTop: -10,
      marginLeft: 20,
      paddingRight: 30,
      maxWidth: "90%",
    },
    contentDesktop: {
      marginLeft: "calc(100% / 8)",
    },
    teamWrapper: {
      paddingTop: 10,
      paddingLeft: 20,

      marginBottom: 0,
    },
    teamWrapperBorder: {
      borderLeft: "1px solid #ccc",
    },
    teamGroupWrapper: {
      marginTop: 30,
      marginLeft: 40,
      position: "relative",
    },
    summaryContainer: {
      position: "relative",
    },
    showButton: {
      color: "#43586C",
      cursor: "pointer",
      background: "#F2F5FC",
      marginBottom: "-16px",
      fontSize: 11,
      fontWeight: "bold",
      display: "inline-block",
      padding: "2px 4px",
      borderRadius: "5px 5px 0 0",
      boxSizing: "border-box",
      border: "1px solid white",
      borderBottom: "none",
      border: "1px solid #E2EAF5",
      borderBottom: "none",
      "&:hover": {
        color: "#5D81A4",
      },
    },
    teamGroupLink: {
      zIndex: 1,
      position: "absolute",
      left: -20,
      top: -85,
      height: 145,
      width: 28,
      borderLeft: "1px solid #ccc",
      borderBottom: "1px solid #ccc",
      borderRadius: "0 0 0 10px",
    },
    teamGroupLinkSmall: {
      top: -15,
      height: 75,
    },
    team: {
      transition: "transform 200ms ease-in",
      border: "1px solid transparent",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.02)",
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    teamLink: {
      height: 145,
      width: 0,
      position: "absolute",
      left: -28,
      top: 0,
      borderLeft: "1px solid #ccc",
    },
  };
};

const OrganizationDropdown = ({
  organization,
  previousLevel,
  type,
  classes,
  onClick,
  width,
  isBetweenGroups,
  index,
  full,
  rootTeamGroupSelectable,
  teamGroupSelectable,
  logo,
  promises,
  setPromises,
  loadTeams,
}) => {
  const intl = useIntl();
  const localStorageKey = "EXPANDED_TEAM_GROUPS";

  const expandedTeamGroups = _.compact(
    (localStorage.getItem(localStorageKey) || "").split(",")
  ).map((item) => parseInt(item));
  const [showContent, setShowContent] = useState(
    expandedTeamGroups.indexOf(organization.id) >= 0 || !previousLevel
  );
  const [teams, setTeams] = useState();
  const [teamsLoading, setTeamsLoading] = useState(false);
  const [loadTeamsAllowed, setLoadTeamsAllowed] = useState(
    loadTeams === undefined || loadTeams
  );
  const isDesktop = !isWidthDown("sm", width);
  const teamGroupRef = useRef();

  const OrganizationDropdownWithStyles = withWidth()(
    withStyles(styles)(OrganizationDropdown)
  );
  const level = previousLevel ? previousLevel + 1 : 1;
  // const teamGroupChildren = organization.teamGroups ? organization.teamGroups.map(team => renderMenu(team, level, 'teamGroup')) : []
  // const teamChildren = organization.teams ? organization.teams.map(team => renderMenu(team, level, 'team')) : []
  // const mergedChildren = [...teamGroupChildren, ...teamChildren]
  const currentType = type || "teamGroup";

  const displayNone = showContent ? {} : { display: "none" };
  const contentStyle = Object.assign(displayNone, {
    width: isDesktop ? "calc(100% - 100%/8);" : "auto",
  });

  const hasTeamGroups = _.get(organization, "teamGroups.length", 0) > 0;
  const hasTeams = _.get(organization, "teams.length", 0) > 0;
  const nbTeams =
    _.get(organization, "teamsCount", 0) +
    _.get(organization, "teamGroups.length", 0);
  const nbTeamsWording =
    _.get(organization, "teamsCount", 0) > 0
      ? intl.formatMessage({ id: "common.teams" }).toLowerCase()
      : intl.formatMessage({ id: "common.team_groups" }).toLowerCase();

  // Auto scroll
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (!firstUpdate.current) {
      const y =
        teamGroupRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        140;
      window.scrollTo({ top: y });
    }
    firstUpdate.current = false;

    if (showContent) {
      localStorage.setItem(
        localStorageKey,
        _.uniq([...expandedTeamGroups.slice(-9), organization.id])
      );
    } else {
      if (expandedTeamGroups.indexOf(organization.id) >= 0) {
        localStorage.setItem(
          localStorageKey,
          _.filter(
            expandedTeamGroups,
            (item) => item !== organization.id
          ).slice(-10)
        );
      }
    }
    // Fetch teams when unfold team group
    const teamPromise = promises[organization.id];
    if (showContent && !teamPromise && !teams && !teamsLoading) {
      const promise = api.teams.listByGroup(organization.id, full);
      setTeamsLoading(true);
      setPromises(Object.assign({}, promises, { [organization.id]: promise }));
      // promise.then(result => {
      //   if(result) {
      //     console.log('result', result);
      //     setTeams(result.data)
      //   }
      // })
    }
  }, [showContent]);

  useEffect(() => {
    if (loadTeams === undefined || loadTeams) {
      setLoadTeamsAllowed(true);
    }
  }, [loadTeams]);

  useEffect(() => {
    if (promises) {
      const teamPromise = promises[organization.id];
      if (teamPromise) {
        teamPromise.then((result) => {
          if (result) {
            setTeams(result.data);
          }
        });
      }
    }
  }, [promises]);

  return (
    <Grid
      container
      direction='column'
      spacing={2}
      style={{ marginTop: level === 1 ? 0 : -20, width: "100%" }}
    >
      <Grid
        item
        xs={10}
        sm={6}
        md={3}
        className={classes.summaryContainer}
        style={{ minWidth: 250, zIndex: 10 }}
      >
        <Grid
          container
          style={{ position: "absolute", bottom: 9, left: 0, width: "100%" }}
          justify='center'
          ref={teamGroupRef}
        >
          <Grid item style={{ zIndex: 10 }}>
            <DefaultText
              onClick={() => {
                setShowContent(!showContent);
              }}
              className={classes.showButton}
              style={{ fontSize: 11, fontWeight: "bold" }}
            >
              {showContent ? (
                <React.Fragment>
                  {`${intl.formatMessage({ id: "organization_menu.hide" })} `}{" "}
                  {nbTeams} {nbTeamsWording}
                  <FontAwesomeIcon
                    size='xs'
                    icon={faChevronUp}
                    style={{ marginLeft: 5, fontSize: 11, fontWeight: "bold" }}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {`${intl.formatMessage({ id: "organization_menu.show" })} `}{" "}
                  {nbTeams} {nbTeamsWording}
                  <FontAwesomeIcon
                    size='xs'
                    icon={faChevronDown}
                    style={{ marginLeft: 5, fontSize: 11, fontWeight: "bold" }}
                  />
                </React.Fragment>
              )}
            </DefaultText>
          </Grid>
        </Grid>
        {level > 1 && (
          <div
            className={`${classes.teamGroupLink} ${
              !hasTeams ? classes.teamGroupLinkSmall : ""
            }`}
            style={Object.assign(
              isBetweenGroups ? { borderRadius: 0 } : {},
              index > 0 ? { height: 120, top: -65 } : {}
            )}
          />
        )}
        <Card
          className={`${classes.thumbnail} ${
            teamGroupSelectable ? classes.team : ""
          }`}
        >
          <div
            style={{ paddingBottom: 15 }}
            onClick={() => {
              if (teamGroupSelectable) {
                onClick(organization, "teamGroup");
              }
            }}
          >
            <TeamGroup
              team={organization}
              hideManager={!organization.parent}
              image={!organization.parent && logo ? logo : null}
              hideTeamGroupUsers
            />
          </div>
        </Card>
      </Grid>
      <Grid
        item
        direction='column'
        style={displayNone}
        container
        className={`${classes.contentWrapper} ${
          isDesktop ? classes.contentDesktop : ""
        }`}
      >
        <Grid item style={{ width: "100%" }}>
          <Grid
            container
            spacing={2}
            className={`${classes.teamWrapper} ${
              hasTeamGroups ? classes.teamWrapperBorder : ""
            }`}
          >
            <React.Fragment>
              {isBetweenGroups && <div className={classes.teamLink} />}
              {!teams && <Loader centered />}
              {teams &&
                teams.map((team) => {
                  const teamKey = `C${team.id}`;

                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={teamKey}
                      style={{ minWidth: 300 }}
                      onClick={() => {
                        onClick(team);
                      }}
                    >
                      <Card className={`${classes.thumbnail} ${classes.team}`}>
                        <TeamNode team={team} />
                      </Card>
                    </Grid>
                  );
                })}
            </React.Fragment>
          </Grid>
        </Grid>
        <Grid item>
          {isBetweenGroups && (
            <div
              className={classes.teamLink}
              style={{ top: 0, left: -28, width: 0, height: "100%" }}
            />
          )}
          {organization.teamGroups && organization.teamGroups.length > 0 && (
            <React.Fragment>
              {organization.teamGroups.map((teamGroup, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    style={{ marginLeft: 20 }}
                    className={classes.teamGroupWrapper}
                  >
                    <OrganizationDropdownWithStyles
                      organization={teamGroup}
                      previousLevel={level}
                      onClick={onClick}
                      isBetweenGroups={
                        index < organization.teamGroups.length - 1
                      }
                      index={index}
                      full={full}
                      rootTeamGroupSelectable={rootTeamGroupSelectable}
                      teamGroupSelectable={rootTeamGroupSelectable}
                      promises={promises}
                      setPromises={setPromises}
                      loadTeams={teams !== undefined}
                    />
                  </Grid>
                );
              })}
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const OrganizationDropdownWithStyles = withWidth()(
  withStyles(styles)(OrganizationDropdown)
);

const OrganizationMenu = ({
  classes,
  organizationRoot,
  onClick,
  full,
  teamGroupSelectable,
  ...props
}) => {
  const { images, imagesLoading } = props.systemImageList;
  const logo =
    images &&
    _.get(
      images.find((x) => x.code === "LOGO"),
      "src"
    );

  const [teams, setTeams] = useState();
  const [teamPromise, setTeamPromise] = useState();
  const [showContent, setShowContent] = useState(true);
  const [promises, setPromises] = useState({});

  // if(!showContent) {
  //   setShowContent(true)
  // }

  // useEffect(() => {
  //   // Fetch teams when unfold team group
  //   if(showContent && !teamPromise && !teams) {
  //     console.log(organizationRoot.id, teamPromise);
  //     const promise = api.teams.listByGroup(organizationRoot.id, full)
  //     promise.then(result => {
  //       if(result) {
  //         setTeams(result.data)
  //       }
  //     })
  //     setTeamPromise(promise)
  //   }
  // }, [showContent])

  return (
    <div style={{ width: "100%", padding: 5, paddingTop: 10 }}>
      <Grid container spacing={1} style={{ marginTop: 5 }}>
        <Grid item xs={12}>
          <OrganizationDropdownWithStyles
            organization={organizationRoot}
            onClick={onClick}
            full={full}
            rootTeamGroupSelectable={teamGroupSelectable}
            teamGroupSelectable={teamGroupSelectable}
            logo={logo}
            promises={promises}
            setPromises={setPromises}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ systemImageList }) => ({
  systemImageList,
});

export default connect(mapStateToProps)(withStyles(styles)(OrganizationMenu));
