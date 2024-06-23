import React from 'react';
import {useIntl} from "react-intl";

const Footer = () => {
    const intl = useIntl();

    return (
        <>
            <footer>
                <div className={'footer-content'}>
                    {intl.formatMessage({id: 'spider.app_name'})} V1.0.0
                    { /* TODO: le n° de version */}
                </div>
            </footer>
        </>
    );
}

export default Footer;
