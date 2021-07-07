import React from 'react'
import Linkify from 'react-linkify'

const CustomLinkify = ({...props}) => {
    return (
        <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
            <a target="_blank" href={decoratedHref} key={key}>
                {decoratedText}
            </a>
        )}>{props.children}</Linkify>
    )
}

export default CustomLinkify
