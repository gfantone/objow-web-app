import {Dialog, Slide} from "@material-ui/core";
import React from "react";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    paper: {
        position: 'absolute',
        right: 0,
        height: '100vh',
        width: '25rem',
        padding: 0,
        margin: 0,
        maxHeight: '100vh',
        borderRadius: 0,
        '& > div:first-child, & > form > div:first-child': {
            marginTop: 0,
            paddingTop: 0,
        },
        '& > div:nth-child(2), & > div:nth-child(3), & > form > div:nth-child(2), & > form > div:nth-child(3)':
            {
                marginTop: 0,
            },
    },
};

const DialogComponent = withStyles(styles)(Dialog);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='left' ref={ref} {...props} />;
});

// todo: might be insert directly in the dialog component with a specific option for a right panel opening instead of center one

const ScreenRightDialog = ({ ...props }) => {
    // todo: handle mobileScreen ?
    const mobileScreen = false;

    return (
        <React.Fragment>
            {mobileScreen && (
                <DialogComponent
                    {...props}
                    fullScreen
                    style={{ marginTop: 50 }}
                    TransitionComponent={Transition}
                />
            )}
            {!mobileScreen && <DialogComponent {...props} />}
        </React.Fragment>
    );
}

export default ScreenRightDialog;
