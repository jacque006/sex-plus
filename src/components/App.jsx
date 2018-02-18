import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  AppBar,
  Avatar,
  Drawer,
  FlatButton,
  Card, 
  CardActions, 
  CardHeader, 
  CardMedia, 
  CardTitle, 
  CardText
} from 'material-ui';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import * as reducers from '../redux/reducers';

import Submit from './submit/Submit';

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
  constructor(props) {
    super(props);
    this.state = {
      accountKey: '',
      accountBalance: ''
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount(){
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        var account, balance;

        // Use the browser's ethereum provider
        var provider = web3.currentProvider;
        if (provider.isMetaMask) {

          // Web3 doesn't support many synchronous requests, so we're using callbacks 
          // to ensure async functionality 
          web3.eth.getAccounts((error, result) => {
            if (error != null) {
              console.log(`An error occurred getting accounts: ${error}`);
            } else {
              // Just getting first account in results list
              account = result[0];
              this.setState({accountKey: account});

              // Getting balance from first account in list of accounts    
              web3.eth.getBalance(account, (error, result) =>{
                if (error != null) {
                  console.log(
                      `An error occured getting account balance: ${error}`
                  );
                } else {
                  balance = result;
                  this.setState({accountBalance: balance});
                }
              });
            }
          });
        }
      } else {
        console.log('No web3? You should consider trying MetaMask!');
      }
    }  
      
  render() {
    return (
      <div>
        <h3>
          Profile
        </h3>
        <div className = "profile--container">
          <Card className="profile--card">
            <CardHeader
            title="Your Name"
            subtitle= {this.state.accountKey}
            avatar="./public/images/eth.png"
            />
            <CardTitle title="Account Balance"/>
              <CardText>
              {this.state.accountBalance.toString()} ETH
              </CardText>
          </Card>
        </div>
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
                title="Sex+"
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
