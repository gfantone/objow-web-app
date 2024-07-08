const textFieldStyles = {
    MuiOutlinedInput: {
        notchedOutline: {
            borderRadius: '12px',
            borderColor: '#8596AD',
            border: '2px solid',
            padding: '16px 4px 4px 16px'
        }
    },
    MuiInputLabel: {
        root: {
            fontWeight: 700,
            color: '#64748B',
            fontFamily: 'Ubuntu'
        },
        outlined: {
            '&.MuiInputLabel-shrink': {
                transform: 'translate(20px, -6px) scale(0.75)'
            }
        }
    },
    MuiInputBase: {
        input: {
            fontWeight: 400,
            color: '#0F172A',
            fontFamily: 'Ubuntu'
        }
    },
    MuiFormHelperText: {
        root: {
            marginTop: '0px',
            fontWeight: 400,
            color: '#475569',
            fontFamily: 'Ubuntu'
        }
    },
    // todo: should add this style to counter the input legend missing space, see main color input
    // 'PrivateNotchedOutline-legendLabelled-9 > span': {
    //     marginRight: '5px',
    //     // '& > span': {
    //     //     paddingRight: '10px'
    //     // }
    // }
};

export default textFieldStyles;
