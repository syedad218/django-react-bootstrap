import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTicketDetails, getCategories, updateTicket } from '../../../actions/tickets';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

export class TicketDetails extends Component {
  static propTypes = {
    getTicketDetails: PropTypes.func.isRequired,
    updateTicket: PropTypes.func.isRequired,
    ticket: PropTypes.object,
    categories: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      category: '',
      redirect: false,
      disabled: true,
      button: 'btn btn-secondary',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ticket && this.props !== nextProps) {
      this.setState({
        title: nextProps.ticket.ticket.title,
        content: nextProps.ticket.ticket.content,
        category: nextProps.ticket.ticket.category,
      });
      // console.log(nextProps.ticket.comments[0].comment);
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ disabled: false, button: 'btn btn-success' });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, content, category } = this.state;
    this.props.updateTicket(this.props.match.params.id, { title, content, category });
    this.setState({ redirect: true });
  }
  componentDidMount() {
    this.props.getTicketDetails(this.props.match.params.id);
    this.props.getCategories();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const { title, content, category, disabled, button } = this.state;
    const { ticket, categories } = this.props;
    return (
      <div className="container">
        <div className="card card-body mt-4 mb-4">
          <h2>Ticket Details</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label>Content</label>
              <textarea
                id="content"
                rows="3"
                name="content"
                className="form-control"
                onChange={this.handleChange}
                value={content}
              />
            </div>
            <div className="form-group">
              <label>category</label>
              <select
                name="category"
                className="form-control"
                onChange={this.handleChange}
                value={category}
              >
                <option selected value="">
                  ---
                </option>
                {categories.map((item, key) => {
                  return (
                    <option key={key} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <button disabled={disabled} type="submit" className={button}>
                Update
              </button>
            </div>
          </form>
        </div>
        <div class="card">
          <h5 style={{ padding: '1rem' }}>Solution</h5>
          <div class="card-body">
            {ticket
              ? ticket.comments.map((comment) => {
                  return (
                    <div class="alert alert-info" role="alert">
                      {comment.comment}
                    </div>
                  );
                })
              : ''}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ticket: state.tickets.activeTicket,
  categories: state.tickets.categories,
});

export default connect(
  mapStateToProps,
  { getTicketDetails, getCategories, updateTicket }
)(TicketDetails);
