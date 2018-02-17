import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Main } from './Main';

export default class App extends React.Component {
    render() {
        return (
          <MuiThemeProvider>
            <Main />
          </MuiThemeProvider>
        );
    }
}
