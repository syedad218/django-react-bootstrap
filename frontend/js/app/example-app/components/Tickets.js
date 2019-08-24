import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTickets, deleteTicket } from '../../../actions/tickets';
import moment from 'moment';

export class Tickets extends Component {
  static propTypes = {
    tickets: PropTypes.array.isRequired,
    getTickets: PropTypes.func.isRequired,
    deleteTicket: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getTickets();
  }
  render() {
    return (
      <Fragment>
        <h5>Tickets</h5>
        <table className="table table-striped table-hover table-light">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Created</th>
              <th>Modified</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.tickets.map((ticket) => (
              // console.log(ticket);
              <tr key={ticket.id}>
                <td>{ticket.ticket_id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.category}</td>
                <td>{moment(ticket.created).format('DD/MM/YY, h:mm:ss a')}</td>
                <td>{moment(ticket.modified).fromNow()}</td>
                <td>{ticket.status}</td>
                <td>
                  <button
                    onClick={this.props.deleteTicket.bind(this, ticket.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  tickets: state.tickets.tickets,
});

export default connect(
  mapStateToProps,
  { getTickets, deleteTicket }
)(Tickets);
