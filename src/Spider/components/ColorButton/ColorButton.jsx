import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const styles = {
    colorButton: {
        position: 'relative',
        minWidth: '4rem',
        minHeight: '2.5rem',
        height: '2.5rem',
        borderRadius: '0.5rem'
    },
    selectedColor: {
        border: '#0768f2 solid 2px',
    },
    selectedCross: {
        position: 'absolute',
        right: '0',
        bottom: '0',
        minWidth: '1.1rem',
        minHeight: '0.9rem',
        borderTopLeftRadius: '0.3rem',
        backgroundColor: '#0768f2',
    },
    checkIcon: {
        position: 'absolute',
        top: '30%',
        marginTop: 'calc((0.45rem) - (1em))',
        left: '55%',
        marginLeft: 'calc((0.55rem) - (1em))',
        color: 'white'
    }
}

const ColorButton = ({selected = false, hexadecimalColor, onClick = () => {}, ...props}) => {
    return (
        <div onClick={() => onClick(hexadecimalColor)} className={`${props.classes.colorButton} ${selected ? props.classes.selectedColor : ''}`} style={{backgroundColor: hexadecimalColor}}>
            {(selected && <div className={props.classes.selectedCross}>
                    <div className={props.classes.checkIcon}>
                        <FontAwesomeIcon
                            icon={faCheck}
                            size={'xs'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default withStyles(styles)(ColorButton);
