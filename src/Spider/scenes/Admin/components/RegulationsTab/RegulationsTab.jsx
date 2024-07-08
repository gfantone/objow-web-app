import React, {useState} from 'react';
import {Typography} from "@material-ui/core";
import {useIntl} from "react-intl";
import {Regulation} from "./components/Regulation";
import {withStyles} from "@mui/styles";

const styles = {
    regulationPage: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    regulations: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    }
}

const RegulationsTab = ({ ...props }) => {
    const intl = useIntl();

    const [regulations, setRegulations] = useState([
        {
            id: 1,
            label: intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.regulations.legalNotice'}),
            multiple: false,
            code: 'LN'
        },
        {
            id: 2,
            label: intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.regulations.dataProtection'}),
            multiple: false,
            code: 'DP'
        },
        {
            id: 3,
            label: intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.regulations.platformRegulation'}),
            multiple: true,
            code: 'PR'
        }
    ])

    const renderRegulations = () => {
        return regulations.map((regulation) => {
            return (
                <>
                    <Regulation key={regulation.id} regulation={regulation}/>
                </>
            )
        })
    }

    return (
        <div className={props.classes.regulationPage}>
            <Typography variant={'h2'} component={'h2'}>
                {intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.regulations.title'})}
            </Typography>

            <Typography variant={'body1'}>
                {intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.regulations.subtitle'})}
            </Typography>

            <div className={props.classes.regulations}>
                { renderRegulations() }
            </div>
        </div>
    )
}

export default withStyles(styles)(RegulationsTab);
