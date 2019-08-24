import React from 'react';
import PropTypes from 'prop-types';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

class Alerts extends React.Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, alert } = this.props;
    if (error !== prevProps.error) {
      alert.error('There is an error!');
    }
  }
  render() {
    return <React.Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
