import React from "react";
import { Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => {
  return {
    root: {
      fontSize: 13,
      textTransform: "uppercase",
      color: "#FFFFFF",
      backgroundColor: theme.palette.secondary.main,
    },
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
    },
  };
};

export default withStyles(styles)(Chip);
