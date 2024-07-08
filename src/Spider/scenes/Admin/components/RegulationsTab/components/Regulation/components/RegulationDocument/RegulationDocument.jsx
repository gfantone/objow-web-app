import React from 'react'
import {withStyles} from "@mui/styles";
import {Button} from "../../../../../../../../components";
import {DocumentDownload} from "iconsax-react";
import {Chip} from "@material-ui/core";
import {useIntl} from "react-intl";

const styles = {
    regulationDocument: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    regulationDocumentInformation: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem',
        color: '#475569'
    },
}

const RegulationDocument = ({ document, showStatus = true, ...props }) => {
    const intl = useIntl();

    const openBlankDocument = () => {
        window.open(document.src, '_blank')
    }

    return (
        <div className={props.classes.regulationDocument}>
            <div className={props.classes.regulationDocumentInformation}>
                <div>
                    { document.filename }
                </div>
                <div>
                    { new Date(document.created_at).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) }
                </div>
                { showStatus &&
                    <Chip
                        label={document.status === 'active' ? intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.regulations.statusActive'}) : intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.regulations.statusInactive'})}
                        className={`${document.status === 'active' ? 'active' : 'inactive'}`}
                    />
                }
            </div>
            <Button variant={'contained'} color={'primary'} className={'size-tiny icon'} disableRipple
                    onClick={openBlankDocument}>
                <DocumentDownload/>
            </Button>
        </div>
    )
}

export default withStyles(styles)(RegulationDocument);
