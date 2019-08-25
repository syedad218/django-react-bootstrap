import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getTicketDetails,
  getCategories,
  updateTicket,
  addComment,
  getTickets,
} from '../../../actions/tickets';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

export class TicketDetails extends Component {
  static propTypes = {
    getTicketDetails: PropTypes.func.isRequired,
    updateTicket: PropTypes.func.isRequired,
    getTickets: PropTypes.func,
    addComment: PropTypes.func,
    ticket: PropTypes.object,
    categories: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      category: '',
      status: '',
      redirect: false,
      disabled: true,
      is_staff: false,
      comment: '',
      button: 'btn btn-secondary',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ticket && this.props !== nextProps) {
      this.setState({
        title: nextProps.ticket.ticket.title,
        content: nextProps.ticket.ticket.content,
        category: nextProps.ticket.ticket.category,
        status: nextProps.ticket.ticket.status,
        is_staff: nextProps.user.is_staff,
      });
      // console.log(nextProps.ticket.comments[0].comment);
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ disabled: false, button: 'btn btn-success' });
  }
  handleChangeComment(e) {
    this.setState({ comment: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, content, category, status } = this.state;
    this.props.updateTicket(this.props.match.params.id, { title, content, category, status });
    this.setState({ redirect: true });
  }
  handleSubmitComment(e) {
    e.preventDefault();
    const { comment } = this.state;
    let ticket = this.props.match.params.id;
    this.props.addComment({ ticket: ticket, comment: comment });
  }
  componentDidMount() {
    this.props.getTicketDetails(this.props.match.params.id);
    this.props.getCategories();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const { title, content, category, disabled, button, is_staff, status, comment } = this.state;
    const { ticket, categories } = this.props;
    return (
      <div className="container">
        <div className="card card-body mt-4 mb-4">
          <h2>Ticket Details</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                disabled={is_staff}
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
                disabled={is_staff}
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
                disabled={!is_staff}
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
              <label>status</label>
              <select
                name="status"
                disabled={!is_staff}
                className="form-control"
                onChange={this.handleChange}
                value={status}
              >
                <option selected value="">
                  ---
                </option>
                {['PENDING', 'CLOSED'].map((item, key) => {
                  return (
                    <option key={key} value={item}>
                      {item}
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
        <div className="card">
          <h5 style={{ padding: '0.5rem' }}>Comments</h5>
          {is_staff ? (
            <div className="card card-body mt-4 mb-4">
              <form onSubmit={this.handleSubmitComment}>
                <div className="form-group">
                  <label>Add solutions/comments</label>
                  <textarea
                    id="content"
                    rows="3"
                    name="content"
                    className="form-control"
                    onChange={this.handleChangeComment}
                    value={comment}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </form>
            </div>
          ) : (
            ''
          )}

          <div className="card-body">
            {ticket
              ? ticket.comments.map((comment) => {
                  return (
                    <div className="alert alert-info" role="alert">
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
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { getTicketDetails, getCategories, updateTicket, addComment, getTickets }
)(TicketDetails);
