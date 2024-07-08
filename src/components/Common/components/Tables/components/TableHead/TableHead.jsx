import { TableHead } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => {
  return {
    root: {
      backgroundColor: theme.palette.secondary.main,
      borderRadiusTopLeft: 10,
      color: "#FFFFFF",
    },
  };
};

export default withStyles(styles)(TableHead);
