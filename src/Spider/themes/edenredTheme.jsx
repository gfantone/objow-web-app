import {createTheme} from '@material-ui/core/styles';
import {
    appBarStyles,
    buttonStyles,
    cardStyles,
    dialogStyles,
    iconButtonStyles,
    linkStyles,
    stepperStyles,
    tabsStyles,
    typographyStyles,
} from './styles';

const useEdenredTheme = (cssBaselineStyles) => createTheme({
    ...typographyStyles,
    overrides: {
        ...cssBaselineStyles,
        ...appBarStyles,
        ...buttonStyles,
        ...cardStyles,
        ...dialogStyles,
        ...iconButtonStyles,
        ...linkStyles,
        ...stepperStyles,
        ...tabsStyles,
    },
});

export default useEdenredTheme;
