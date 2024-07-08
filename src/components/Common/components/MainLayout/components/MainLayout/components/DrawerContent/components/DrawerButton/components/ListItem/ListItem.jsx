import { ListItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => {
  return {
    root: {
      fontSize: 15,
      color: "#555555",
      textTransform: "none",
      borderRadius: 16,
      paddingLeft: 16,
      paddingTop: 0,
      paddingRight: 16,
      paddingBottom: 0,
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.08)",
      },
      "& svg": {
        color: "#555555",
      },
      "& span": {
        fontSize: 15,
      },
    },
    selected: {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: "#FFFFFF",
      "& svg": {
        color: "#FFFFFF",
      },
    },
  };
};

export default withStyles(styles)(ListItem);
