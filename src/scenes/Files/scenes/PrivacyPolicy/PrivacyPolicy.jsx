import React, {useEffect} from 'react'
import policy from "../../../../assets/files/politique_confidentialite.pdf";

const PrivacyPolicy = ({ ...props }) => {
    useEffect(() => {
        props.onTitle("Politique de confidentialité");
        props.onFile(policy)
    });

    return (
        <div></div>
    )
};

export default PrivacyPolicy
