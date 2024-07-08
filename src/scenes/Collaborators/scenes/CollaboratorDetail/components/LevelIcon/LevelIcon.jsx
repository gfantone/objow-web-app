import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia } from "@material-ui/core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Avatar,
} from "../../../../../../components";
import * as Resources from "../../../../../../Resources";
import { useIntl } from "react-intl";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  avatarWrapper: {
    position: "relative",
  },
  circle: {
    position: "absolute",
    top: 0,
    height: "100%",
    border: `3px solid ${theme.palette.primary.main}`,
    borderRadius: 100,
    left: "50%",
    marginLeft: "-50px",
    width: "100px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "-75px",
      width: "150px",
    },
  },
  image: {
    cursor: "pointer",
    height: 100,
    width: 100,

    [theme.breakpoints.down("xs")]: {
      height: 150,
      width: 150,
    },
  },
  detailImage: {
    height: 200,
    width: 200,
    margin: "auto",
    [theme.breakpoints.down("xs")]: {
      height: 300,
      width: 300,
    },
  },
}));

const LevelIcon = ({ image, collaborator, ...props }) => {
  const intl = useIntl();
  const classes = useStyles();
  const [detailOpen, setDetailOpen] = React.useState(false);

  const handleCloseClick = (open) => () => {
    setDetailOpen(open);
  };

  // Circle is outside of Avatar to handle bug with bitmap images
  return (
    <div>
      <div className={classes.avatarWrapper}>
        <Avatar
          src={image}
          className={classes.image}
          onClick={handleCloseClick(true)}
          entityId={_.get(collaborator, "id")}
          fallbackName={_.get(collaborator, "fullname")}
        />
        <div className={classes.circle} />
      </div>
      <Dialog
        open={detailOpen}
        onClose={handleCloseClick(false)}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogContent>
          <CardMedia
            image={image}
            className={classes.detailImage}
            onClick={handleCloseClick(true)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClick(false)}>
            {intl.formatMessage({ id: "reward.detail.image_close_button" })}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LevelIcon;
