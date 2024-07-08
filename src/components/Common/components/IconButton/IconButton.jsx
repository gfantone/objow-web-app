import React from "react";
import { IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => {
  return {
    root: {
      color: "#FFFFFF",
    },
    colorPrimary: {
      color: theme.palette.primary.main,
    },
    colorSecondary: {
      color: "#103D5C",
    },
  };
};

export default withStyles(styles)(IconButton);
