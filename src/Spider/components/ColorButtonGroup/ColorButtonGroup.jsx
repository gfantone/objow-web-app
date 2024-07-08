import React, {useEffect, useState} from 'react';
import {ColorButton} from "../ColorButton";
import {withStyles} from "@mui/styles";
import {createTheme} from "@material-ui/core/styles";

const styles  = {
    colorButtons: {
        display: 'grid',
        gap: '1rem',
        'grid-template-columns': 'repeat(4, 0fr)',
        justifyContent: 'center',
        [createTheme().breakpoints.up('md')]: {
            'grid-template-columns': 'repeat(8, 0fr)',
            justifyContent: 'left',
        },
        [createTheme().breakpoints.up('lg')]: {
            'grid-template-columns': 'repeat(12, 0fr)',
            justifyContent: 'left',
        },
    }
}

const ColorButtonGroup = ({colors, onSelectedColorChange, initialColor = '#EE225CFF', ...props}) => {

    const [selectedColor, setSelectedColor] = useState(initialColor);
    const [colorsData, setColorsData] = useState(colors.map((colorItem) => {
        return { color: colorItem, selectedColor: colorItem === initialColor }
    }))
    const changeSelectedColor = (color) => {
        setSelectedColor(color)
        onSelectedColorChange(color)
    }

    useEffect(() => {
        setSelectedColor(initialColor)
    }, [initialColor]);

    return (
        <div className={props.classes.colorButtons}>
            {colorsData.map((colorItem) => {
                return (
                    <ColorButton
                        key={colorItem.color}
                        selected={selectedColor === colorItem.color}
                        hexadecimalColor={colorItem.color}
                        onClick={(color) => changeSelectedColor(color)}
                    />
                )
            })}
        </div>
    )
}

export default withStyles(styles)(ColorButtonGroup);
