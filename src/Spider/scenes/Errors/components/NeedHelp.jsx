import React from 'react';
import {useIntl} from "react-intl";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link, Typography
} from '@material-ui/core';

const NeedHelp = () => {
    const intl = useIntl();

    const [open, setOpen] = React.useState(false);

    const closeDialog = () => setOpen(false);

    const openDialog = () => setOpen(true);

    return (
        <>
            <Link className={'bold large'} onClick={openDialog}>
                {intl.formatMessage({id: 'spider.errors.need_help.submit'})}
            </Link>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle disableTypography>
                    <Typography variant={'h1'} component={'h1'} className={'underline-center'}>
                        {intl.formatMessage({id: 'spider.errors.need_help.title'})}
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {intl.formatMessage({id: 'spider.errors.need_help.message'})}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button size={'small'} color={'primary'} variant={'contained'} disableRipple onClick={closeDialog}>
                        {intl.formatMessage({id: 'spider.errors.need_help.close'})}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default NeedHelp;
