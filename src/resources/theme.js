import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";


let theme = createMuiTheme({
  palette: {
    // used to represent primary interface elements for a user
    primary: {
      main: "#0065bd",
    },
    // used to represent secondary interface elements for a user
    secondary: {
      main: "#FFFFFF",
    },
  },
 
  typography: {
    fontFamily: ["Roboto"].join(","),
    fontSize: 24,
    h1: {
        fontSize: 60,
        '@media screen and (min-width:1024px)': {
          fontSize: 52,
        },
        '@media screen and (min-width:768px)': {
          fontSize: 44,
        },
        '@media screen and (min-width:568px)': {
          fontSize: 36,
        },
        '@media screen and (min-width:320px)': {
          fontSize: 24,
        },
      },
    h2: {
      fontSize: 52,
      '@media screen and (min-width:1024px)': {
        fontSize: 44,
      },
      '@media screen and (min-width:768px)': {
        fontSize: 36,
      },
      '@media screen and (min-width:568px)': {
        fontSize: 24,
      },
      '@media screen and (min-width:320px)': {
        fontSize: 20,
      },
    },
    h3: {
      fontSize: 48,

      '@media screen and (min-width:1024px)': {
        fontSize: 40,
      },
      '@media screen and (min-width:768px)': {
        fontSize: 32,
      },
      '@media screen and (min-width:568px)': {
        fontSize: 24,
      },
      '@media screen and (min-width:320px)': {
        fontSize: 20,
      },
    },
    h4: {
      fontSize: 40,
      '@media screen and (min-width:1024px)': {
        fontSize: 32,
      },
      '@media screen and (min-width:768px)': {
        fontSize: 24,
      },
      '@media screen and (min-width:568px)': {
        fontSize: 18,
      },
      '@media screen and (min-width:320px)': {
        fontSize: 16,
      },
    }
  },
  table: {
    minWidth: 650,
  },

  // allows us to override css sheets in this file, instructions here https://material-ui.com/customization/globals/
  overrides: {
    MuiInputLabel: { 
      root: { 
        color:'grey',
        fontSize: 20, 
      },
    },
    MuiTextField: {
      root: {
        margin: 5,
        size: 'small',
        color: 'grey'
      },
    },
    MuiButton1: {
      root: {
        width: 100,
      }
    }
}
});

theme = responsiveFontSizes(theme);

export default theme;