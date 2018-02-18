import React from 'react';
import PropTypes from 'prop-types';

import {
    RaisedButton,
    TextField,
} from 'material-ui';

import { connect } from 'react-redux';

import { setValue } from "../../redux/actions";

class ViewRecord extends React.Component {
    constructor(props) {
        super(props);
        console.warn(props.currentValue);

        this.state = {
            newValue: '',
        };
    }

    onValueChange = (event, newValue) => {
        this.setState({
          newValue,
        });
    };

    changeValue = () => {
        const { dispatch } = this.props;
        const { newValue } = this.state;

        dispatch(setValue(newValue));
        this.setState({
            newValue: '',
        });
    };

    render() {
        const { currentValue } = this.props;
        console.warn(currentValue);

        return (
          <div style={{ flex: 1 }}>
            <div>{`Current value: ${currentValue}`}</div>
            <TextField
                floatingLabelText="New Value"
                onChange={this.onValueChange}
            /><br />
            <RaisedButton
                label="Change Value"
                primary={true}
                onClick={this.changeValue}
            />
          </div>
        );
    }
}

ViewRecord.propTypes = {
  currentValue: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        currentValue: state.currentValue,
    }
};

export default connect(
    mapStateToProps,
)(ViewRecord)
