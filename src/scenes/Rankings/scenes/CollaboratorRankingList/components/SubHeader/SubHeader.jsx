import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Loader, RoundedTab, RoundedTabs, UserProfile } from '../../../../../../components'

const style = {
    root: {
        padding: 16
    }
};

const SubHeader = ({ page, onChange, ...props }) => {
    const { classes } = props;
    const { collaborator, loading } = props.collaboratorDetail;
    const [value, setValue] = React.useState(page);

    function handleChange(e, value) {
        setValue(value);
        onChange(value)
    }

    const renderLoader = () => {
        return (
            <div className={classes.root}>
                <Loader centered />
            </div>
        )
    };

    const renderData = () => {
        return (
            <div>
                <UserProfile user={collaborator} />
                <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                    <RoundedTab label='Individuel' />
                    <RoundedTab label='Équipe' />
                </RoundedTabs>
            </div>
        )
    };
    
    return (
        <div>
            { loading && renderLoader() }
            { !loading && collaborator && renderData() }
        </div>
    )
};

const mapStateToProps = ({ collaboratorDetail }) => ({
    collaboratorDetail
});

export default connect(mapStateToProps)(withStyles(style)(SubHeader))