import React, {useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {Tab} from '@material-ui/core';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import {withStyles} from "@mui/styles";
import {PersonalizationTab} from "./components/PersonalizationTab";
import {RegulationsTab} from "./components/RegulationsTab";
import {useIntl} from "react-intl";

const styles = {
    adminBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    adminHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem'
    }
}

const Admin = ({ ...props }) => {
    const intl = useIntl();

    const REGULATIONS_TAB = { label: intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.adminTabLabel.regulations'}), index: '1', url: 'regulations' }
    const PERSONALIZATION_TAB = { label: intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.adminTabLabel.personalization'}), index: '2', url: 'personalization' }
    const PARAMETERS_TAB = { label: intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.adminTabLabel.parameters'}), index: '3', url: 'parameters' }

    const [tabValue, setTabValue] = useState(REGULATIONS_TAB.index);

    const handleChange = (event, tab) => {
        setTabValue(tab);
    };

    return (
        <div className={props.classes.adminBody}>

            <div className={props.classes.adminHeader}>
                <Typography variant={'h1'} component={'h1'} className={'underline-left'}>
                    {intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.title'})}
                </Typography>
            </div>

            <TabContext value={tabValue}>
                <div className={'tabs-container'}>
                    <TabList onChange={handleChange} disableRipple>
                        <Tab label={REGULATIONS_TAB.label} value={REGULATIONS_TAB.index} disableFocusRipple/>
                        <Tab label={PERSONALIZATION_TAB.label} value={PERSONALIZATION_TAB.index} disableFocusRipple/>
                        <Tab label={PARAMETERS_TAB.label} value={PARAMETERS_TAB.index} disableFocusRipple/>
                    </TabList>
                    <TabPanel value={REGULATIONS_TAB.index}>
                        <RegulationsTab/>
                    </TabPanel>
                    <TabPanel value={PERSONALIZATION_TAB.index}>
                        <PersonalizationTab/>
                    </TabPanel>
                    <TabPanel value={PARAMETERS_TAB.index}>
                        <Grid container spacing={4}>
                        </Grid>
                    </TabPanel>
                </div>
            </TabContext>
        </div>
    );
};

export default withStyles(styles)(Admin);
