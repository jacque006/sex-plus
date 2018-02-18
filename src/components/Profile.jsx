import React from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardText,
} from 'material-ui';

export default class Profile extends React.Component {
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
