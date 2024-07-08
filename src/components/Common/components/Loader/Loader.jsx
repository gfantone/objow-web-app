import React from "react";
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  centeredRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    color: "primary",
    zIndex: 1,
  },
};

const Loader = ({ centered = false, classes }) => {
  const rootClassName = centered ? classes.centeredRoot : "";

  return (
    <div className={rootClassName}>
      <CircularProgress classes={{ colorPrimary: classes.loader }} />
    </div>
  );
};

export default withStyles(styles)(Loader);
