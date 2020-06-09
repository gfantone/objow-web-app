import React, {useEffect} from 'react'
import {withFormsy} from 'formsy-react'
import {CardMedia, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {InfoText, ErrorText} from "../../../../components/Common/components/Texts/components";

const styles = {
    image: {
        height: 80,
        opacity: 0.25,
        '&:hover': {
            opacity: 1
        },
        cursor: 'pointer'
    },
    selectedImage: {
        height: 80,
        cursor: 'pointer'
    },
    panel: {
        backgroundColor: 'initial',
        borderRadius: 'initial',
        boxShadow: 'none'
    },
    panelSummary: {
        padding: 'initial'
    },
    panelDetails: {
        padding: 'initial'
    }
};

const ImageInput = ({ images = [], initial, label, name, onChange, required, ...props }) => {
    const { classes } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [value, setValue] = React.useState(initial);
    const errorMessage = !(!props.isFormSubmitted && value == null) ? props.getErrorMessage : null;
    const hasError = !(!props.isFormSubmitted && value == null || props.isValid);
    const finalLabel = required ? `${label} *` : label;

    useEffect(() => {
        props.setValue(initial)
    }, []);

    const handleExpansionChange = (event, expanded) => {
        setExpanded(expanded)
    };

    const handleValue = value => () => {
        props.setValue(value)
        setValue(value);
        setExpanded(false);
        if (onChange) onChange(value)
    };

    return (
        <div>
            <ExpansionPanel expanded={expanded} onChange={handleExpansionChange} className={classes.panel}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.panelSummary}>
                    { !hasError && <InfoText>{finalLabel}</InfoText> }
                    { hasError && <ErrorText>{finalLabel}</ErrorText> }
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panelDetails}>
                    <Grid container spacing={2}>
                        { images.map((image) => {
                            const imageClass = value == image.id ? classes.selectedImage : classes.image;
                            return (
                                <Grid key={image.id} item xs={3} onClick={handleValue(image.id)}>
                                    <CardMedia image={image.path} className={imageClass} />
                                </Grid>
                            )
                        }) }
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <input type='hidden' name={name} value={value} />
            { hasError && <ErrorText>{errorMessage}</ErrorText> }
        </div>
    )
};

export default withStyles(styles)(withFormsy(ImageInput))
