import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  FlatButton,
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardText,
  List,
  ListItem,
  TextField,
  RaisedButton
} from 'material-ui';
import LabelIcon from 'material-ui-icons/Label';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import * as reducers from '../redux/reducers';

import Submit from './submit/Submit';
import ViewRecord from './record/ViewRecord';

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
  constructor(props) {
    super(props);
    this.submissionData = {
      userAddress: '',
      sendToAddress: '',
      ethAmount: ''
    };
    
    this.contractData = {
      contractAddress: '',
      stiInput:'',
      bcInput: ''
    };

    this.state = {
      contractOutput: ''
    }

    this.onSendTransaction = this.onSendTransaction.bind(this);
    this.onSendContract = this.onSendContract.bind(this);
  }

  onUserAddressChange = (event, newValue) => {
    this.submissionData.userAddress = newValue;
  };

  onSendToAddressChange = (event, newValue) => {
    this.submissionData.sendToAddress = newValue;
  };

  onEthAmountChange = (event, newValue) => {
    this.submissionData.ethAmount = newValue;
  };
  onSendTransaction = () => {
    // const { dispatch } = this.props;

    console.log(this.submissionData.userAddress);
    console.log(this.submissionData.sendToAddress);
    console.log(this.submissionData.ethAmount);

    var transactionObj = {
      from: this.submissionData.userAddress,
      to: this.submissionData.sendToAddress,
      value: this.submissionData.ethAmount
    }

    web3.eth.sendTransaction({from: this.submissionData.userAddress, to: this.submissionData.sendToAddress, value: web3.toWei(this.submissionData.ethAmount, 'ether')}, (error, result) => {
      if (error != null){
        console.log(`Error in sending transaction ${error}`);
      } else {
          console.log(`Success ${result}`);
      }
    });
  };

  onContractAddressChange = (event, newValue) => {
    this.contractData.contractAddress = newValue;
  };

  onStiInputChange = (event, newValue) => {
    this.contractData.stiInput = newValue;
  };

  onBirthControlInputChange = (event, newValue) => {
    this.contractData.bcInput = newValue;
  };

  onSendContract = () => {
    var abi = [{
      constant: true,
      inputs: [],
      name: "read",
      outputs: [{
          name: "",
          type: "string"
      }],
      payable: false,
      stateMutability: "view",
      type: "function"
     }, {
      constant: false,
      inputs: [{
          name: "_value",
          type: "string"
      }],
      name: "write",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
  }];
    var address = this.contractData.contractAddress;
    var MyContract = web3.eth.contract(abi);
    var myContractInstance = MyContract.at(address);
    var call = myContractInstance.write(this.contractData.input, (error, result) => {
      var result = myContractInstance.read.call((error, result) =>{
        this.setState({contractOutput: result});
        console.log(`result ${result}`);
      });
    });

  };

  
  
  render() {
    return (
      <div>
        <h3>
        Home
        </h3>
        <div className="home--container">
          <Card className="home--card__getContract">
            <CardTitle title="Get Contract"/>
            <CardText>
              <TextField hintText="Contract address" floatingLabelText="Contract address" onChange={this.onContractAddressChange}/>
              <br/>
              <TextField hintText="STI true or false" floatingLabelText="STI" onChange={this.onStiInputChange}/>
              <br/>
              <TextField hintText="Birth Control true or false" floatingLabelText="Birth Control" onChange={this.onBirthControlInputChange}/>
              <br/>
              <RaisedButton label="Execute Contract" primary={true} onClick={this.onSendContract}/>
              <br/>
              <h3>
                Output
              </h3>
              {<LabelIcon/>}{this.state.contractOutput}               
            </CardText>
          </Card>
          <Card className ="home--card__sendMoney">
            <CardTitle title="Send Money"/>
            <CardText>
              <TextField hintText="Your address" floatingLabelText="From"  onChange={this.onUserAddressChange}/>
              <br/>
              <TextField hintText="Send to address" floatingLabelText="To" onChange={this.onSendToAddressChange}/>
              <br/>
              <TextField hintText="0" floatingLabelText="Amount of ETH" onChange={this.onEthAmountChange}/>
              <br/>
              <RaisedButton label="Send ETH" primary={true} onClick={this.onSendTransaction}/>
            </CardText>
          </Card>
        </div>
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
                  balance = web3.fromWei(balance, 'ether');
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
              <CardText>
              Get Records
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
                    <FlatButton
                        label="Record"
                        onClick={() => this.navigateTo(ROUTES.RECORD)}
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
                  <Route exact path={ROUTES.RECORD} component={ViewRecord }/>
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
