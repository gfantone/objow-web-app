import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { DefaultText, RoundedTab, RoundedTabs } from '../../../../../../components'

const styles = {
    root: {
        padding: 16
    }
};

const SubHeader = ({ onChange, ...props }) => {
    const { classes } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (e, value) => {
        setValue(value);
        if (onChange) onChange(value == 0)
    };

    return (
        <div>
            <div className={classes.root}>
                <DefaultText align={'center'}>Gestion des utilisateurs</DefaultText>
            </div>
            <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                <RoundedTab label='Actives' />
                <RoundedTab label='Archivées' />
            </RoundedTabs>
        </div>
    )
};

export default withStyles(styles)(SubHeader)
