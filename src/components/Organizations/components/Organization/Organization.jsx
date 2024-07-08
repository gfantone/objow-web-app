import React, { useState, createRef, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Tree, TreeNode } from "react-organizational-chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";
import { OrganizationNode } from "../";
import { DefaultText, IconButton } from "../../../";
import _ from "lodash";

const styles = {
  wrapper: {
    "&> ul": {
      width: 320,
      "&> li": {
        // background: 'rgba(238, 238, 238, 0.4)',
        // border: "2px dashed #333",
        padding: "10px !important",
      },
    },
  },
};

const Organization = ({
  onClick,
  organizationRoot,
  onAddBelow,
  companyName,
  classes,
  companyLogo,
}) => {
  // Flags to disable click on card if the user is just dragging
  const [enableClick, setEnableClick] = useState(true);
  const [clicking, setClicking] = useState(false);

  const [scale, setScale] = useState(
    Number(localStorage.getItem("organizationScale")) || 1
  );
  const [scrollLeft, setScrollLeft] = useState(0);
  const [centerWrapperSignal, setCenterWrapperSignal] = useState(false);

  const wrapper = createRef();

  const renderOrganization = (organization, previousLevel, type) => {
    const level = previousLevel ? previousLevel + 1 : 1;
    const teamGroupChildren = organization.teamGroups
      ? organization.teamGroups.map((team) =>
          renderOrganization(team, level, "teamGroup")
        )
      : [];
    const teamChildren = organization.teams
      ? organization.teams.map((team) =>
          renderOrganization(team, level, "team")
        )
      : [];
    const mergedChildren = [...teamGroupChildren, ...teamChildren];
    const currentType = type || "teamGroup";

    return (
      <OrganizationNode
        lineHeight="30px"
        onClick={(team) => {
          if (enableClick) {
            onClick(team, currentType);
          }
          setEnableClick(true);
          setClicking(false);
        }}
        onMouseDown={() => {
          setClicking(true);
        }}
        team={organization}
        rootNode={level === 1}
        companyName={companyName}
        companyLogo={companyLogo}
        type={type || "teamGroup"}
        onAddBelow={onAddBelow}
        hasTeams={teamChildren.length > 0}
        onToggleShowChildren={() => {
          setCenterWrapperSignal(!centerWrapperSignal);
        }}
      >
        {_.sortBy(mergedChildren, (item) => item.props.team.name.toLowerCase())}
      </OrganizationNode>
    );
  };

  const centerWrapper = () => {
    const newScrollLeft = _.get(
      wrapper,
      "current.children[0].children[0].children[0].offsetWidth"
    );
    if (newScrollLeft) {
      setScrollLeft(newScrollLeft - _.get(wrapper, "current.offsetWidth"));
    }
  };

  useEffect(() => {
    if (_.get(wrapper, "current.offsetWidth")) {
      setCenterWrapperSignal(!centerWrapperSignal);
    }
  }, wrapper);

  useEffect(() => {
    centerWrapper();
  }, [centerWrapperSignal]);

  useEffect(() => {
    localStorage.setItem("organizationScale", scale);
  }, [scale]);

  if (!organizationRoot) {
    return <div></div>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        cursor: "move",
        backgroundSize: "10px 10px",
        // backgroundImage: 'linear-gradient(to right, #eee 1px, transparent 1px), linear-gradient(to bottom, #eee 1px, transparent 1px)',
        background: "#F7F9FC",
        border: "1px solid #DDE3EC",
        borderRadius: 5,
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 5, left: 5, zIndex: 10 }}>
        <Grid container spacing={1}>
          <Grid item>
            <IconButton
              style={{ color: "#555555" }}
              size="small"
              onClick={() => setScale(scale <= 0.1 ? 0.1 : scale - 0.1)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </IconButton>
          </Grid>
          <Grid item>
            <DefaultText style={{ lineHeight: 2 }}>
              {parseInt(scale * 100)}%
            </DefaultText>
          </Grid>
          <Grid item>
            <IconButton
              style={{ color: "#555555" }}
              size="small"
              onClick={() => setScale(scale + 0.1)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
          </Grid>
        </Grid>
      </div>
      <Draggable
        onDrag={() => {
          if (clicking && enableClick) {
            setEnableClick(false);
          }
          if (scrollLeft) {
            setScrollLeft(null);
          }
        }}
        position={scrollLeft ? { x: (scrollLeft / 2) * -1, y: 5 } : null}
      >
        <div ref={wrapper} style={{ width: "auto" }}>
          <div
            style={{ transform: `scale(${scale})` }}
            className={classes.wrapper}
          >
            {renderOrganization(organizationRoot)}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default withStyles(styles)(Organization);
