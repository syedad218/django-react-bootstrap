import React, { Component, Fragment } from 'react';
import Form from './Form';
import Tickets from './Tickets';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };
  render() {
    const { is_staff } = this.props.user;
    return (
      <Fragment>
        {!is_staff ? <Form /> : <br />}
        <Tickets />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
