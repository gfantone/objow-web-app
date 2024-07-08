import {Dialog, Slide} from "@material-ui/core";
import React from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth, {isWidthDown} from "@material-ui/core/withWidth";

const styles = {
    paper: {
        position: 'absolute',
        right: 0,
        height: '100vh',
        width: '32vw',
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

const ScreenRightDialog = ({ width = 'xs', ...props }) => {
    // todo: handle mobileScreen ?
    const mobileScreen = isWidthDown('xs', width);

    return (
        <React.Fragment>
            {mobileScreen && (
                <DialogComponent
                    {...props}
                    fullScreen
                    TransitionComponent={Transition}
                />
            )}
            {!mobileScreen && <DialogComponent {...props} />}
        </React.Fragment>
    );
}

export default withWidth()(ScreenRightDialog);
