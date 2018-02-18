import React from 'react';
import PropTypes from 'prop-types';

import {
    Checkbox,
    Card,
    CardTitle,
    CardText,
    DatePicker,
    RaisedButton,
    FlatButton,
    TextField,
} from 'material-ui';

export default class Submit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isBirthControlChecked: false,
            submitted: false,
        };

        this.contractData = {
            contractAddress: '',
            userAddress: '',
            std: false,
            birthCtr: {
                checked: false,
                durationMonths: '',
            },
            submitDate: Date.now(),
            expDate: Date.now()
        };

        this.getRecordContractData = {
            contractAddress: '',
            userAddress: ''
        }

        this.onSendContract = this.onSendContract.bind(this);
        this.onSendGetRecordContract = this.onSendGetRecordContract.bind(this);
    }

    onContractAddressChange = (event, newValue) => {
        this.contractData.contractAddress = newValue;
    };

    onUserAddressChange = (event, newValue) => {
        this.contractData.userAddress = newValue;
    };

    onSTDChange = (event, newValue) => {
        this.contractData.std = newValue;
    };

    onBirthControlChecked = (event, isChecked) => {
      this.setState({
        birthCtr: isChecked,
      });
      this.contractData.birthCtr.checked = isChecked;
    };

    getProviderAbi = function() {
        return [{
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
    };

    getUserAbi = function() {
    return [{
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
    }

    onSendContract = () => {
        const sleepTime = 5000; // milliseconds

        var address = this.contractData.contractAddress.trim();

        var MyContract = web3.eth.contract(this.getProviderAbi());
        var myContractInstance = MyContract.at(address);

        var UsrContract = web3.eth.contract(this.getUserAbi());
        var userContractInst = UsrContract.at(this.contractData.userAddress);

        console.debug('Contract inputs', 
            'Address', this.contractData.userAddress,
            'STD', this.contractData.std,
            'BirthCtr', this.contractData.birthCtr,
            'Submit Date', this.contractData.submitDate,
            'Exp Date', this.contractData.expDate);

        myContractInstance.updateRecord(
            userContractInst,
            this.contractData.std,
            this.contractData.birthCtr,
            this.contractData.submitDate,
            this.contractData.expDate,
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
                myContractInstance.updateRecord.call((error, result) => {
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


    onGetRecordContractAddressChange = (event, newValue) => {
        this.getRecordContractData.contractAddress = newValue;
    };

    onGetRecordUserAddressChange = (event, newValue) => {
        this.getRecordContractData.userAddress = newValue;
    };

    onSendGetRecordContract = () => {
        const getleepTime = 5000; // milliseconds

        var getAddress = this.getRecordContractData.contractAddress.trim();

        var GetContract = web3.eth.contract(this.getProviderAbi);
        var getContractInstance = GetContract.at(getAddress);

        var GetUsrContract = web3.eth.contract(this.getUserAbi);
        var getUserContractInst = GetUsrContract.at(this.getRecordContractData.userAddress);

        console.debug('Contract inputs', 
            'Contract Address', this.getRecordContractData.contractAddress,
            'User Address', this.getRecordContractData.userAddress);

       getUserContractInstance.getRecord(
            this.getRecordContractData.contractAddress,
            this.getRecordContractData.userAddress,
            (error, transactionHash) => {
            console.debug('Transaction started', transactionHash);

            const checkForGetTransactinDone = () => {
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
                    myContractInstance.getRecord.call((error, result) => {
                        this.setState({contractOutput: result});
                        console.debug(`Transaction result ${result}`);
                    });
                    }, sleepTime);

                    return;
                }

                setTimeout(checkForGetTransactinDone, sleepTime);
                });
            };
            setTimeout(checkForGetTransactinDone, sleepTime);
            }
        );
    };

    goHome = () => {
        const { dispatch } = this.props;
        dispatch(push(HOME));
    };

    render() {
        const { isBirthControlChecked, submitted } = this.state;

        return (
          <div>
              <h3>
                  Update Record
              </h3>
            <div className="home--container">
                <Card className="home--card__getContract">
                    <CardTitle title="Update Record"/>
                    <CardText>
                        <TextField
                            floatingLabelText="Provider Address"
                            onChange={this.onContractAddressChange}
                        /><br />
                        <TextField
                            floatingLabelText="User Address"
                            onChange={this.onUserAddressChange}
                        /><br />
                        <Checkbox
                            label="On Birth Control"
                            onCheck={this.onBirthControlChecked}
                        />
                        { isBirthControlChecked && <TextField floatingLabelText="Duration (Months)" onChange={this.onDurationChange}/>}
                        <Checkbox
                            label="Active STI"
                            onCheck={this.onSTDChange}
                        />
                        <RaisedButton
                            label="Submit"
                            primary={true}
                            onClick={this.onSendContract}
                            disabled={submitted}
                        />
                        { submitted && <div>Information submitted. It may take some time to process</div> }
                        { submitted &&  <FlatButton label="Go Home" secondary={true} onClick={this.goHome}/>}
                    </CardText>
                </Card>
                <Card className="home--card__getContract">
                    <CardTitle title="Get Record"/>
                    <CardText>
                    <TextField
                            floatingLabelText="Contract Address"
                            onChange={this.onGetRecordContractAddressChange}
                        /><br />
                    <TextField
                            floatingLabelText="User Address"
                            onChange={this.onGetRecordUserAddressChange}
                        /><br />
                    <RaisedButton
                        label="Get Records"
                        primary={true}
                        onClick={this.onSendGetRecordContract}
                    />
                    </CardText>
                </Card>
          </div>
          </div>
        );
    }
}
