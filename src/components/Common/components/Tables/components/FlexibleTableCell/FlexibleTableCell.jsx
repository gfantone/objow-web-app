import React from "react";
import { TableCell } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  rootDefault: {
    fontSize: 13,
    color: "#555555",

    padding: "initial",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    [theme.breakpoints.down("xs")]: {
      maxWidth: 0,
    },
  },
  rootPrimary: {
    fontSize: 13,
    fontWeight: "bold",

    padding: "initial",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    [theme.breakpoints.down("xs")]: {
      maxWidth: 0,
    },
  },
}));

const FlexibleTableCell = ({ color, ...props }) => {
  const classes = useStyles();
  const rootClass =
    color == "primary" ? classes.rootPrimary : classes.rootDefault;

  return <TableCell {...props} className={rootClass} />;
};

export default FlexibleTableCell;
