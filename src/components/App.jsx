import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  FlatButton
} from 'material-ui';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import * as reducers from '../redux/reducers';

import Submit from './submit/Submit';
import ViewRecord from './record/ViewRecord';
import Home from './Home';
import Profile from './Profile';
import MedicalProvider from './MedicalProvider';
import NewUser from './NewUser';

import * as ROUTES from '../routes';

const history = createHistory()
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
      ...reducers,
      router: routerReducer
  }),
  applyMiddleware(middleware)
);

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
    };
  }

  toggleDrawer = () => {
    const { drawerOpen } = this.state;

    this.setState({
      drawerOpen: !drawerOpen
    });
  };

  closeDrawer = () => {
    this.setState({
      drawerOpen: false
    });
  };

  navigateTo = (path) => {
    store.dispatch(push(path));
    this.closeDrawer();
  };

  render() {
    const { drawerOpen } = this.state;

      return (
          <Provider store={store} >
            <div>
              <AppBar
                title="S+"
                iconElementRight={
                  <Avatar style={{ cursor: 'pointer' }}>J</Avatar>}
                onLeftIconButtonClick={this.toggleDrawer}
                onRightIconButtonClick={() => this.navigateTo(ROUTES.PROFILE)}
              />
              <Drawer
                open={drawerOpen}
                containerStyle={{'position': 'absolute', 'top': '80px'}}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Main
                    <FlatButton
                      label="Home"
                      onClick={() => this.navigateTo(ROUTES.HOME)}
                    />
                    <FlatButton
                        label="Submit"
                        onClick={() => this.navigateTo(ROUTES.SUBMIT)}
                    />
                    <FlatButton
                        label="Record"
                        onClick={() => this.navigateTo(ROUTES.RECORD)}
                    />
                    <FlatButton
                      label="Medical Provider"
                      onClick={() => this.navigateTo(ROUTES.MEDICAL_PROVIDER)}
                    />
                    <FlatButton
                      label="New User"
                      onClick={() => this.navigateTo(ROUTES.NEW_USER)}
                    />

                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Settings
                    <FlatButton
                      label="My Profile"
                      onClick={() => this.navigateTo(ROUTES.PROFILE)}
                    />
                  </div>
                </div>
              </Drawer>
              <ConnectedRouter history={history}>
                <div>
                  <Route exact path={ROUTES.HOME} component={Home}/>
                  <Route exact path={ROUTES.MEDICAL_PROVIDER} component={MedicalProvider}/>
                  <Route exact path={ROUTES.PROFILE} component={Profile}/>
                  <Route exact path={ROUTES.SUBMIT} component={Submit}/>
                  <Route exact path={ROUTES.RECORD} component={ViewRecord }/>
                  <Route exact path={ROUTES.NEW_USER} component={NewUser} />
                </div>
              </ConnectedRouter>
            </div>
          </Provider>
      );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Main />
      </MuiThemeProvider>
    );
  }
}
