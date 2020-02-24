import React, {useEffect} from 'react'
import terms from "../../../../assets/files/cgu.pdf";

const UseTerms = ({ ...props }) => {
    useEffect(() => {
        props.onTitle("Condition générales d'utilisation");
        props.onFile(terms)
    });

    return (
        <div></div>
    )
};

export default UseTerms
