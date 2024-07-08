import React from 'react';
import {Button as MuiButton} from '@material-ui/core';

const Button = ({
                    children,
                    color,
                    disabled,
                    load = false,
                    onClick,
                    size,
<<<<<<< HEAD
=======
                    type,
>>>>>>> dev
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
<<<<<<< HEAD
            <MuiButton disabled={disabled} variant={variant} color={color} size={size} disableRipple onClick={onClick}>
=======
            <MuiButton disabled={disabled} variant={variant} color={color} size={size} type={type} disableRipple onClick={onClick}>
>>>>>>> dev
                {renderContent()}
            </MuiButton>
        </>
    );
};

export default Button;
