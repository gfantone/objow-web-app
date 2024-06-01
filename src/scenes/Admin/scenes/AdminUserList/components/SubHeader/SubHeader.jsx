import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import {
  DefaultText,
  RoundedTab,
  RoundedTabs,
} from "../../../../../../components";

const styles = {
  root: {
    padding: 16,
  },
};

const SubHeader = ({ onChange, ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (e, value) => {
    setValue(value);
    if (onChange) onChange(value);
  };

  return (
    <div>
      <div className={classes.root}>
        <DefaultText align={"center"}>
          {intl.formatMessage({ id: "admin.user.title" })}
        </DefaultText>
      </div>
      <RoundedTabs value={value} onChange={handleChange} variant="fullWidth">
        <RoundedTab
          label={intl.formatMessage({ id: "admin.user.current_tab" })}
        />
        <RoundedTab
          label={intl.formatMessage({ id: "admin.user.archived_tab" })}
        />
      </RoundedTabs>
    </div>
  );
};

export default withStyles(styles)(SubHeader);
