import React from 'react';

import {
  Card,
  CardTitle,
  CardText,
  TextField,
  RaisedButton
} from 'material-ui';
import LabelIcon from 'material-ui-icons/Label';

export default class MedicalProvider extends React.Component {
    constructor(props) {
        super(props);
        this.submissionData = {
            userAddress: '',
            sendToAddress: '',
            ethAmount: ''
          };
      
          this.contractData = {
            contractAddress: '',
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

        onSendContract = () => {
            var abi = 
            [{
              constant: false,
              inputs: [{
                  name: "usrCtrct",
                  type: "address"
              }],
              name: "getRecord",
              outputs: [{
                  name: "",
                  type: "address"
              }],
              payable: false,
              stateMutability: "nonpayable",
              type: "function"
          }, {
              constant: false,
              inputs: [{
                  name: "usrCtrct",
                  type: "address"
              }, {
                  name: "std",
                  type: "bool"
              }, {
                  name: "birthCtr",
                  type: "bool"
              }, {
                  name: "submitDate",
                  type: "uint256"
              }, {
                  name: "expDate",
                  type: "uint256"
              }],
              name: "updateRecord",
              outputs: [],
              payable: false,
              stateMutability: "nonpayable",
              type: "function"
          }, {
              inputs: [],
              payable: false,
              stateMutability: "nonpayable",
              type: "constructor"
          }];
          
            const sleepTime = 5000; // milliseconds

            var address = this.contractData.contractAddress.trim();
        
            var MyContract = web3.eth.contract(abi);
            var myContractInstance = MyContract.at(address);
        
            console.debug('Contract inputs', 'Address', address);
        
            myContractInstance.constructor(this.contractData, (error, transactionHash) => {
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
                      myContractInstance.call((error, result) => {
                        this.setState({contractOutput: result});
                        console.debug(`Transaction read result ${result}`);
                      });
                    }, sleepTime);
        
                    return;
                  }
        
                  setTimeout(checkForTransactinDone, sleepTime);
                });
              };
              setTimeout(checkForTransactinDone, sleepTime);
            });
    };
    render() {
        return (
          <div>
            <h3>
            Medical Provider
            </h3>
            <div className="home--container">
              <Card className="home--card__getContract">
                <CardTitle title="Get Contract"/>
                <CardText>
                  <TextField hintText="Contract address" floatingLabelText="Contract address" onChange={this.onContractAddressChange}/>
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