import React from 'react'
import {DefaultText, RoundedTab, RoundedTabs} from "../../../../../../components";
import * as Resources from "../../../../../../Resources";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    root: {
        padding: 16
    }
}

const SubHeader = ({onChange, ...props}) => {
    const { classes } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (e, value) => {
        setValue(value);
        if (onChange) onChange(value == 0)
    };

    return (
        <div>
            <div className={classes.root}>
                <DefaultText align={'center'}>{Resources.ADMIN_REWARD_CATEGORY_LIST_SUBTITLE}</DefaultText>
            </div>
            <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                <RoundedTab label={Resources.ADMIN_REWARD_CATEGORY_LIST_ACTIVE_TAB} />
                <RoundedTab label={Resources.ADMIN_REWARD_CATEGORY_LIST_INACTIVE_TAB} />
            </RoundedTabs>
        </div>
    )
}
export default withStyles(styles)(SubHeader)
