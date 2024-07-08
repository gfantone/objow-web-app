import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => {
  return {
    root: {
      fontSize: 13,
      color: theme.palette.secondary.main,
      textTransform: "uppercase",
    },
  };
};

export default withStyles(styles)(Typography);
