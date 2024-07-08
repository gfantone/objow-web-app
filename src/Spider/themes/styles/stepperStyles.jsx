import {themeColors, neutralColors} from '../colors';

const stepperStyles = {
    MuiStepper: {
        root: {
            backgroundColor: 'transparent',
            padding: 0
        }
    },
    MuiStepConnector: {
        line: {
            borderColor: neutralColors.neutral300,
        },
        lineHorizontal: {
            borderWidth: '3px',
            borderRadius: '100px',
            borderTopWidth: 'initial',
        }
    },
    MuiStepLabel: {
        root: {
            '&:has(.MuiStepLabel-active) .MuiStepLabel-iconContainer, &:has(.MuiStepLabel-completed) .MuiStepLabel-iconContainer': {
                backgroundColor: themeColors.secondaryRegular,
                border: 'none',
                color: neutralColors.neutralWhite,
                '& > svg': {
                    display: 'block'
                }
            }
        },
        active: {
            color: `${neutralColors.neutral700} !important`,
            fontWeight: '700 !important',
        },
        alternativeLabel: {
            '&.MuiStepLabel-label': {
                marginTop: '8px',
            }
        },
        completed: {
            color: `${neutralColors.neutral700} !important`,
            fontWeight: '700 !important',
        },
        iconContainer: {
            backgroundColor: neutralColors.neutralBg,
            border: `2px dashed ${neutralColors.neutral300}`,
            borderRadius: '100px',
            height: '32px',
            padding: '8px',
            width: '32px',
            '& > svg': {
                display: 'none'
            }
        },
        label: {
            color: neutralColors.neutral400,
            lineHeight: '24px',
            fontFamily: 'Ubuntu',
            fontSize: 14,
            fontStyle: 'normal',
            fontWeight: 400,
            textAlign: 'center'
        }
    }
};
export default stepperStyles;
