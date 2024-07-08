<<<<<<< HEAD
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
=======
import { createTheme } from '@material-ui/core/styles';
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
  sidebarStyles,
  textFieldStyles,
  tableDataStyles,
  paginationStyles,
  selectStyles,
  paperStyles,
} from './styles';
import chipStyles from "./styles/chipStyles";

const useEdenredTheme = (cssBaselineStyles) =>
  createTheme({
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
      ...sidebarStyles,
      ...textFieldStyles,
      ...tableDataStyles,
      ...paginationStyles,
      ...selectStyles,
      ...paperStyles,
      ...chipStyles,
    },
  });
>>>>>>> dev

export default useEdenredTheme;
