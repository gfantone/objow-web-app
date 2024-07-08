import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Tree, TreeNode } from "react-organizational-chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useIntl } from "react-intl";
import {
  Card,
  DefaultText,
  TeamNode,
  TeamGroup,
  CompanyNode,
} from "../../../../components";
import _ from "lodash";

const styles = (theme) => {
  return {
    treeWrapper: {
      width: 300,
      display: "inline-block",
      cursor: "pointer",
      position: "relative",
      transition: "all 0.2s ease-in",
    },
    treeWrapperTeam: {
      width: 350,
    },
    toggleChildrenButton: {
      color: "#43586C",
      cursor: "pointer",
      background: "#F8FAFD",
      marginBottom: "-16px",
      fontSize: 14,
      display: "inline-block",
      padding: "2px 4px",
      borderRadius: "5px",
      boxSizing: "border-box",
      "&:hover": {
        border: "1px solid #E2EAF5",
      },
    },
    card: {
      borderRadius: 20,
    },
    activeColorPrimary: {
      color: theme.palette.primary.main,
    },
  };
};

const OrganizationNode = ({
  children,
  team: defaultTeam,
  type,
  rootNode,
  classes,
  onAddBelow,
  onClick,
  onMouseDown,
  onToggleShowChildren,
  companyName,
  hideTeamGroupUsers,
  flat,
  companyLogo,
  hasTeams,
}) => {
  const intl = useIntl();
  const localStorageKey = "EXPANDED_ADMIN_TEAM_GROUPS";
  const expandedTeamGroups = _.compact(
    (localStorage.getItem(localStorageKey) || "").split(",")
  ).map((item) => parseInt(item));
  const [showContent, setShowContent] = useState(
    expandedTeamGroups.indexOf(defaultTeam.id) >= 0 || rootNode
  );
  const [showButtons, setShowButtons] = useState(false);
  // Right button
  // <div style={{paddingLeft: 20, position: 'absolute', zIndex: 1, top: 0, right: '-40px',  height: 'calc(100% - 10px)',  fontSize: 25}}>
  //   <div style={{ border: '2px dashed #ccc', height: '100%', width: '100%', color: '#00E58D', background: 'white', width: '30px',}}>
  //     <FontAwesomeIcon size='xs' icon={faPlus} style={{position: 'absolute', right: '6px', top: 'calc(50% - 7px)'}} />
  //   </div>
  // </div>

  const buttons = (
    <React.Fragment>
      <div style={{ paddingTop: 10, zIndex: 10 }}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onAddBelow(team);
          }}
          style={{
            position: "absolute",
            zIndex: 1,
            bottom: "-25px",
            background: "white",
            width: "100%",
            height: "30px",
            border: "2px dashed #ccc",
            fontSize: 25,
          }}
          className={classes.activeColorPrimary}
        >
          <FontAwesomeIcon
            size="xs"
            icon={faPlus}
            style={{
              position: "absolute",
              bottom: "3px",
              left: "calc(50% - 7px)",
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );

  const buttonEvents =
    type === "teamGroup" && onAddBelow
      ? {
          onMouseEnter: () => setShowButtons(true),
          onMouseLeave: () => setShowButtons(false),
        }
      : {};
  const NodeComponent = rootNode ? Tree : TreeNode;
  const hasChildren = children && children.length > 0;
  const team =
    typeof defaultTeam === "object"
      ? Object.assign({}, defaultTeam, { name: defaultTeam.name })
      : {};

  const WrapperComponent = flat ? React.Fragment : Card;

  useEffect(() => {
    if (showContent) {
      localStorage.setItem(
        localStorageKey,
        _.uniq([...expandedTeamGroups, team.id])
      );
    } else {
      if (expandedTeamGroups.indexOf(team.id) >= 0) {
        localStorage.setItem(
          localStorageKey,
          _.filter(expandedTeamGroups, (item) => item !== team.id)
        );
      }
    }
  }, [showContent]);

  if (hasChildren && showContent) {
    return (
      <NodeComponent
        lineHeight="30px"
        label={
          <div
            className={
              type === "team"
                ? `${classes.treeWrapper} ${classes.treeWrapperTeam}`
                : classes.treeWrapper
            }
            {...buttonEvents}
            onClick={() => {
              if (onClick) {
                onClick(team);
              }
            }}
          >
            <WrapperComponent className={classes.card}>
              <div
                style={{ paddingBottom: type === "team" || rootNode ? 0 : 15 }}
              >
                <div onMouseDown={onMouseDown}>
                  {rootNode ? (
                    <CompanyNode
                      team={team}
                      hideTeamGroupUsers={hideTeamGroupUsers}
                      companyLogo={companyLogo}
                    />
                  ) : (
                    <React.Fragment>
                      {type === "team" ? (
                        <TeamNode team={team} />
                      ) : (
                        <TeamGroup
                          team={team}
                          hideTeamGroupUsers={hideTeamGroupUsers}
                        />
                      )}
                    </React.Fragment>
                  )}
                </div>

                {!rootNode && (
                  <Grid
                    container
                    justify="center"
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 0,
                      width: "100%",
                    }}
                  >
                    <Grid item>
                      <DefaultText
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowContent(!showContent);
                          if (onToggleShowChildren) {
                            onToggleShowChildren();
                          }
                        }}
                        className={classes.toggleChildrenButton}
                        style={{ fontSize: 11, fontWeight: "bold" }}
                      >
                        {intl
                          .formatMessage({
                            id: hasTeams
                              ? "team_group.thumbnail.hide_children"
                              : "team_group.thumbnail.hide_children_team_group",
                          })
                          .format(children.length)}

                        <FontAwesomeIcon
                          size="xs"
                          icon={faChevronUp}
                          style={{
                            marginLeft: 5,
                            fontSize: 11,
                            fontWeight: "bold",
                          }}
                        />
                      </DefaultText>
                    </Grid>
                  </Grid>
                )}
              </div>
            </WrapperComponent>
            <div style={{ visibility: showButtons ? "visible" : "hidden" }}>
              {buttons}
            </div>
          </div>
        }
      >
        {children}
      </NodeComponent>
    );
  } else {
    return (
      <NodeComponent
        lineHeight="30px"
        label={
          <div
            className={
              type === "team"
                ? `${classes.treeWrapper} ${classes.treeWrapperTeam}`
                : classes.treeWrapper
            }
            {...buttonEvents}
            onClick={() => {
              if (onClick) {
                onClick(team);
              }
            }}
          >
            <WrapperComponent className={classes.card}>
              <div style={{ paddingBottom: type === "team" ? 0 : 15 }}>
                <div onMouseDown={onMouseDown}>
                  {type === "team" ? (
                    <TeamNode team={team} />
                  ) : (
                    <TeamGroup
                      team={team}
                      hideTeamGroupUsers={hideTeamGroupUsers}
                    />
                  )}
                </div>
                {hasChildren && !rootNode && (
                  <Grid
                    container
                    justify="center"
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 0,
                      width: "100%",
                    }}
                  >
                    <Grid item>
                      <DefaultText
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowContent(!showContent);
                          if (onToggleShowChildren) {
                            onToggleShowChildren();
                          }
                        }}
                        className={classes.toggleChildrenButton}
                        style={{ fontSize: 11, fontWeight: "bold" }}
                      >
                        {intl
                          .formatMessage({
                            id: hasTeams
                              ? "team_group.thumbnail.show_children"
                              : "team_group.thumbnail.show_children_team_group",
                          })
                          .format(children.length)}
                        <FontAwesomeIcon
                          size="xs"
                          icon={faChevronDown}
                          style={{
                            marginLeft: 5,
                            fontSize: 11,
                            fontWeight: "bold",
                          }}
                        />
                      </DefaultText>
                    </Grid>
                  </Grid>
                )}
              </div>
            </WrapperComponent>
            <div style={{ visibility: showButtons ? "visible" : "hidden" }}>
              {buttons}
            </div>
          </div>
        }
      />
    );
  }
};

export default withStyles(styles)(OrganizationNode);
