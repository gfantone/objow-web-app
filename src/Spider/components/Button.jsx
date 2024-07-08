import React from 'react';
import {Button as MuiButton} from '@material-ui/core';

const Button = ({
                    children,
                    color,
                    disabled,
                    load = false,
                    onClick,
                    size,
                    type,
                    variant
                }) => {
    const renderContent = () => {
        if (load) {
            return '...';
        }

        return children;
    };

    return (
        <>
            <MuiButton disabled={disabled} variant={variant} color={color} size={size} type={type} disableRipple onClick={onClick}>
                {renderContent()}
            </MuiButton>
        </>
    );
};

export default Button;
