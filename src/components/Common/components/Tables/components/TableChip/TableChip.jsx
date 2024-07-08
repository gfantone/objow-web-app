import { Chip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => {
  return {
    root: {
      height: 20,
      borderRadius: 10,
      background: theme.palette.secondary.main,
      color: "#FFFFFF",
      fontSize: 14,
      minWidth: 20,
    },
    colorPrimary: {
      background: theme.palette.primary.main,
      color: "#FFFFFF",
    },
    label: {
      paddingLeft: 6,
      paddingRight: 6,
    },
  };
};

export default withStyles(styles)(Chip);
