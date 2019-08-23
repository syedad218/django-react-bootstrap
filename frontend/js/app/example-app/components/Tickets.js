import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads } from '../../../actions/tickets';

export class Tickets extends Component {
  static propTypes = {
    tickets: PropTypes.array.isRequired,
  };
  componentDidMount() {
    this.props.getLeads();
  }
  render() {
    return (
      <div>
        <h1>Tickets List</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tickets: state.tickets.tickets,
});

export default connect(
  mapStateToProps,
  { getLeads }
)(Tickets);
