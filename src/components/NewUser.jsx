import React from 'react';

import {
  Card,
  CardTitle,
  CardText,
  TextField,
  RaisedButton
} from 'material-ui';
import LabelIcon from 'material-ui-icons/Label';

export default class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.submissionData = {
      userAddress: '',
      ethAmount: ''
    };

    this.contractData = {
      contractAddress: '',
      name: '',
      age: '',
      gender: '',
      providerAddress: '',
    };

    this.state = {
      contractOutput: ''
    }
    this.onSendContract = this.onSendContract.bind(this);
  }
    
  onUserAddressChange = (event, newValue) => {
    this.submissionData.userAddress = newValue;
  };

  onEthAmountChange = (event, newValue) => {
    this.submissionData.ethAmount = newValue;
  };

  onContractAddressChange = (event, newValue) => {
    this.contractData.contractAddress = newValue;
  };

  onUserNameChange = (event, newValue) => {
    this.contractData.name = newValue;
  };

  onUserAgeChange = (event, newValue) => {
      this.contractData.age = newValue;
  };

  onUserGenderChange = (event, newValue) => {
      this.contractData.gender = newValue;
  };

  onProviderAddressChange = (event, newValue) => {
    this.contractData.providerAddress = newValue;
}


  onSendContract = () => {
    var abi = [{
        constant: false,
        inputs: [],
        name: "getName",
        outputs: [{
            name: "",
            type: "string"
        }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    }, {
        constant: true,
        inputs: [],
        name: "getRecordsContract",
        outputs: [{
            name: "",
            type: "address"
        }],
        payable: false,
        stateMutability: "view",
        type: "function"
    }, {
        constant: true,
        inputs: [],
        name: "user",
        outputs: [{
            name: "addr",
            type: "address"
        }, {
            name: "name",
            type: "string"
        }, {
            name: "age",
            type: "int256"
        }, {
            name: "gender",
            type: "string"
        }, {
            name: "provider",
            type: "address"
        }, {
            name: "records",
            type: "address"
        }],
        payable: false,
        stateMutability: "view",
        type: "function"
    }, {
        constant: false,
        inputs: [{
            name: "name",
            type: "string"
        }],
        name: "changeName",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    }, {
        constant: false,
        inputs: [{
            name: "provider",
            type: "address"
        }],
        name: "isWhiteListed",
        outputs: [{
            name: "",
            type: "bool"
        }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            name: "name",
            type: "string"
        }, {
            name: "age",
            type: "int256"
        }, {
            name: "gender",
            type: "string"
        }, {
            name: "provider",
            type: "address"
        }],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
    }];

    const sleepTime = 5000; // milliseconds

    var address = this.contractData.contractAddress.trim();

    var MyContract = web3.eth.contract(abi);
    var myContractInstance = MyContract.at(address);

    console.debug('Contract inputs', 'Address', address, 'Name', this.contractData.name);

    myContractInstance.constructor(
        this.contractData.name,
        this.contractData.age,
        this.contractData.gender,
        this.contractData.providerAddress,
        (error, transactionHash) => {
      console.debug('Transaction started', transactionHash);

      const checkForTransactinDone = () => {
        web3.eth.getTransaction(transactionHash, (err, transData) => {
          if (err) {
            console.error(err);
            setTimeout(checkForTransactinDone, sleepTime);
            return;
          }

          console.debug('Transaction block number', transData.blockNumber);

          if (transData.blockNumber > 0) {
            console.debug('Transaction done');

            setTimeout(() => {
              myContractInstance.constructor.call((error, result) => {
                this.setState({contractOutput: result});
                console.debug(`Transaction result ${result}`);
              });
            }, sleepTime);

            return;
          }

          setTimeout(checkForTransactinDone, sleepTime);
        });
      };
      console.debug('About to start timer');
      setTimeout(checkForTransactinDone, sleepTime);
    });

  };

  render() {
    return (
      <div>
        <h3>
        New  User
        </h3>
        <div className="home--container">
          <Card className="home--card__getContract">
            <CardTitle title="New User"/>
            <CardText>
              <TextField hintText="Contract address" floatingLabelText="Contract address" onChange={this.onContractAddressChange}/>
              <br/>
              <TextField hintText="Name" floatingLabelText="Your Name" onChange={this.onUserNameChange}/>
              <br/>
              <TextField hintText="Age" floatingLabelText="Your age" onChange={this.onUserAgeChange}/>
              <br/>
              <TextField hintText="Gender" floatingLabelText="Your gender" onChange={this.onUserGenderChange}/>
              <br/>
              <TextField hintText="Provider Address" floatingLabelText="Your Medical's Provider Chain Address" onChange={this.onProviderAddressChange}/>
              <br/>
              <RaisedButton label="Execute Contract" primary={true} onClick={this.onSendContract}/>
              <br/>
              <h3>
                Output
              </h3>
              {<LabelIcon/>}{this.state.contractOutput}
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}
