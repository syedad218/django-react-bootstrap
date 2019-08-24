import React from 'react';
import PropTypes from 'prop-types';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import _ from 'lodash';

class Alerts extends React.Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      _.forEach(error.msg, function(value, key) {
        alert.error(`${key}: ${value.join()}`);
      });
    }
    if (message !== prevProps.message) {
      _.forEach(message, function(value, key) {
        alert.success(`${value}`);
      });
    }
  }
  render() {
    return <React.Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
