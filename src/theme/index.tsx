import { createTheme, responsiveFontSizes } from '@mui/material/styles'
// assets
import colors from '../assets/scss/_themes-vars.module';
import themePalette from "./palette";
import themeTypography from "./typography";
import componentStyleOverrides from "./compStyleOverride";

const color = colors();

const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
};


const base = createTheme({
    // @ts-ignore
    palette : themePalette(themeOption),
    // palette: {
    //     primary: {
    //         main: '#5575EB',
    //         dark: '#2844b7',
    //         light: color.primaryMain
    //     },
    //     secondary: {
    //         main: '#FFFFFF',
    //     },
    //     error: {
    //         main: red[400]
    //     },
    //     dark: {
    //         light: color.darkTextPrimary,
    //         main: color.darkLevel1,
    //         dark: color.darkLevel2,
    //         800: color.darkBackground,
    //         900: color.darkPaper
    //     },
    // },
    // @ts-ignore
    typography: themeTypography(themeOption)
})
base.components = componentStyleOverrides(themeOption);

const index = responsiveFontSizes(base)

export default index