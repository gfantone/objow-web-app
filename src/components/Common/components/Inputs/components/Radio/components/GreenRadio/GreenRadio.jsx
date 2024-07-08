import { Radio } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => {
  return {
    root: {
      color: theme.palette.primary.main,
    },
    checked: {
      color: `${theme.palette.primary.main} !important`,
    },
  };
};

export default withStyles(styles)(Radio);
