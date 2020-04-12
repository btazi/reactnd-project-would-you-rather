import { createMuiTheme } from "@material-ui/core/styles";
import { blue, orange } from "@material-ui/core/colors";

// color tool: https://material-ui.com/customization/color/#color-tool
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

export default theme;
