import React from 'react';
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  AppBar,
  Avatar,
  Drawer,
  FlatButton,
} from 'material-ui';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import reducers from '../redux/reducers';

import Submit from './submit/Submit';

const history = createHistory()
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  SUBMIT: '/submit',
};

class Home extends React.Component {
  render() {
    return (
      <div>
        Home
      </div>
    );
  }
}

class Profile extends React.Component {
  render() {
    return (
      <div>
        Profile
      </div>
    );
  }
}

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
  }

  closeDrawer = () => {
    this.setState({
      drawerOpen: false
    });
  }

  navigateTo = (path) => {
    store.dispatch(push(path));
    this.closeDrawer();
  }

  render() {
    const { drawerOpen } = this.state;

      return (
          <Provider store={store} >
            <div>
              <AppBar
                title="Sex+"
                iconElementRight={
                  <Avatar style={{ cursor: 'pointer' }}>J</Avatar>}
                onLeftIconButtonTouchTap={this.toggleDrawer}
                onRightIconButtonTouchTap={() => this.navigateTo(ROUTES.PROFILE)}
              />
              <Drawer
                open={drawerOpen}
                containerStyle={{'position': 'absolute', 'top': '80px'}}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    Brands
                    <FlatButton
                      label="Main"
                      onClick={() => this.navigateTo(ROUTES.HOME)}
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
                  <Route exact path={ROUTES.PROFILE} component={Profile}/>
                  <Route exact path={ROUTES.SUBMIT} component={Submit}/>
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
