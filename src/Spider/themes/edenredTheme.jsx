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
    },
  });

export default useEdenredTheme;
