import React from "react";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles";

const styles = (theme) => {
  return {
    root: {
      maxWidth: "none",
      paddingTop: 16,
      paddingBottom: 16,
      backgroundColor: theme.palette.secondary.main,
      display: "flex",
      position: "relative",
    },
  };
};

export default withStyles(styles)(Container);
