import React from 'react';

import {
    Checkbox,
    DatePicker,
    RaisedButton,
    TextField,
} from 'material-ui';

import { submit } from "../../redux/actions";

export default class Submit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isBirthControlChecked: false,
        };

        this.submissionData = {
            etheriumAddress: '',
            name: '',
            dateValue: new Date(),
            birthControl: {
                checked: false,
                durationMonths: '',
            },
            stiChecked: false,
        };
    }

    onAddressChange = (event, newValue) => {
        this.submissionData.etheriumAddress = newValue;
    };

    onNameChange = (event, newValue) => {
        this.submissionData.name = newValue;
    };

    onDateChange = (event, newValue) => {
        this.submissionData.dateValue = newValue;
    };

    onBirthControlChecked = (event, isChecked) => {
      this.setState({
          isBirthControlChecked: isChecked,
      }, () => {
          this.submissionData.birthControl.checked = isChecked;
      });
    };

    onDurationChange = (event, newValue) => {
        this.submissionData.birthControl.durationMonths = newValue;
    };

    onStiChecked = (event, isChecked) => {
        this.submissionData.stiChecked = isChecked;
    };

    onSubmit = () => {
        this.dispatch(submit(this.submissionData));
    };

    render() {
        const { isBirthControlChecked } = this.state;

        return (
          <div style={{ flex: 1 }}>
              <TextField
                  floatingLabelText="Etherium Address"
                  onChange={this.onAddressChange}
              /><br />
              <TextField
                  floatingLabelText="Your Name"
                  onChange={this.onNameChange}
              />
              <DatePicker
                  hintText="Date of Record"
                  onChange={this.onDateChange}
              />
              <Checkbox
                  label="On Birth Control"
                  onCheck={this.onBirthControlChecked}
              />
              { isBirthControlChecked && <TextField floatingLabelText="Duration (Months)" onChange={this.onDurationChange}/>}
              <Checkbox
                  label="Active STI"
                  onCheck={this.onStiChecked}
              />
              <RaisedButton
                  label="Submit"
                  primary={true}
                  onClick={this.onSubmit}
              />
          </div>
        );
    }
}
