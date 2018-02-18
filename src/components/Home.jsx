import React from 'react';

import {
  Card,
  CardTitle,
  CardText,
  TextField,
  RaisedButton
} from 'material-ui';
import LabelIcon from 'material-ui-icons/Label';

export default class Home extends React.Component {
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
