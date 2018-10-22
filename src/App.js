import React, { Component } from 'react';
import 'typeface-gudea';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Footer from './Footer';
import Main from './Main';

const theme = createMuiTheme({
    direction: 'rtl',
  palette: {
    primary: {
      light: '#6099cd',
      main: '#296b9c',
      dark: '#00416d',
      contrastText: '#fff'
    },
    secondary: {
      light: '#e2f1f8',
      main: '#b0bec5',
      dark: '##808e95',
      contrastText: '#000'
    }
  },
  status: {
    danger: 'orange'
  },
  typography: {
    fontFamily: 'Gudea'
  }
});

class App extends Component {
  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <div>
            <Main />
            <Footer />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
