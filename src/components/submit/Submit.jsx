import React from 'react';
import PropTypes from 'prop-types';

import {
    Checkbox,
    DatePicker,
    RaisedButton,
    FlatButton,
    TextField,
} from 'material-ui';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { submit } from "../../redux/actions";

import { HOME } from '../../routes';

class Submit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isBirthControlChecked: false,
            submitted: false,
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
        const { dispatch } = this.props;
        const newSubmission =

        dispatch(submit(this.submissionData));
        this.setState({
            submitted: true,
        })
    };

    goHome = () => {
        const { dispatch } = this.props;
        dispatch(push(HOME));
    };

    render() {
        const { isBirthControlChecked, submitted } = this.state;

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
                  disabled={submitted}
              />
              { submitted && <div>Information submitted. It may take some time to process</div> }
              { submitted &&  <FlatButton label="Go Home" secondary={true} onClick={this.goHome}/>}
          </div>
        );
    }
}

Submit.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        submit: state.submit,
    }
};

export default connect(
    mapStateToProps,
)(Submit)
