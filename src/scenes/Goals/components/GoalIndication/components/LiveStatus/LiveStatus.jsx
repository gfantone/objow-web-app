import React from "react";
import { makeStyles, Radio } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    color: "primary !important",
    marginLeft: -3,
    padding: 0,
  },
});

const LiveStatus = ({ live, ...props }) => {
  const classes = useStyles();

  return <Radio className={classes.root} size="small" checked={live} />;
};

export default LiveStatus;
