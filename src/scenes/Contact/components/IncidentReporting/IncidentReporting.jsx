import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Card, DefaultTitle} from "../../../../components";
import * as Resources from "../../../../Resources";

const useStyles = makeStyles({
    iframe: {
        width: '100%',
        height: 511,
        border: 'none',
    }
});

const IncidentReporting = ({ ...props }) => {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DefaultTitle>{Resources.CONTACT_INCIDENT_FORM_TITLE}</DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <iframe className={classes.iframe} src='https://extend.inescrm.com/maxhd/helpdesk.dll/portail?DMKldMLAxFYZGFJF7FoJG2NqljQBMKBoOKxiDLBVOLBdNE$$2NqljQ7QaNdLr7ZNXor2NqljQ7Qb-jLr7ZNXok2NqljQ9P43iNrJVNqIxFZ6$'></iframe>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
};

export default IncidentReporting
