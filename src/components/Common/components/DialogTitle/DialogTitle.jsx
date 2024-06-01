import React from "react";
import { DialogTitle, Grid, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const styles = (theme) => {
  return {
    root: {
      paddingLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      padding: 0,
      textAlign: "justify",
      fontSize: "1.35rem",
    },
    dialogCloseIcon: {
      color: "white",
      width: 25,
      height: 25,
      fontSize: 20,
      zIndex: 100,
      background: theme.palette.primary.main,
      "&:hover": {
        background: theme.palette.primary.main,
        color: "white",
      },
    },
  };
};

const CustomDialogTitle = ({ classes, onClose, ...props }) => {
  return (
    <Grid container>
      <Grid item xs>
        <DialogTitle {...props} classes={{ root: classes.root }} />
      </Grid>
      {onClose && (
        <Grid item>
          <IconButton
            size="small"
            onClick={onClose}
            className={classes.dialogCloseIcon}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default withStyles(styles)(CustomDialogTitle);
