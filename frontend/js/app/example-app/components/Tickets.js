import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTickets, deleteTicket } from '../../../actions/tickets';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

export class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = { details: false, ticket_id: null };
  }
  static propTypes = {
    tickets: PropTypes.array.isRequired,
    getTickets: PropTypes.func.isRequired,
    deleteTicket: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getTickets();
  }

  handleClick(id) {
    this.setState({ details: true, ticket_id: id });
  }
  render() {
    if (this.state.details) {
      return <Redirect to={`/ticket/${this.state.ticket_id}`} />;
    }
    return (
      <Fragment>
        <h5>Tickets</h5>
        <div className="table-responsive-sm">
          <table className="table table-striped table-hover table-dark">
            <thead>
              <tr>
                <th>Status</th>
                <th>Ticket ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Created</th>
                <th>Modified</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.tickets.map((ticket) => (
                <tr style={{ cursor: 'pointer' }} key={ticket.ticket_id}>
                  <td>
                    <button
                      onClick={this.handleClick.bind(this, ticket.id)}
                      className="btn btn-warning btn-sm"
                    >
                      {ticket.status}
                    </button>
                  </td>
                  <td onClick={this.handleClick.bind(this, ticket.id)}>{ticket.ticket_id}</td>
                  <td onClick={this.handleClick.bind(this, ticket.id)}>{ticket.title}</td>
                  <td onClick={this.handleClick.bind(this, ticket.id)}>{ticket.category}</td>
                  <td onClick={this.handleClick.bind(this, ticket.id)}>
                    {moment(ticket.created).format('DD/MM/YY, h:mm:ss a')}
                  </td>
                  <td onClick={this.handleClick.bind(this, ticket.id)}>
                    {moment(ticket.modified).fromNow()}
                  </td>
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
        </div>
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
