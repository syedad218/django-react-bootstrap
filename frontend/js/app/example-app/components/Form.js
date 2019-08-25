import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createTicket, getCategories } from '../../../actions/tickets';
export class Form extends Component {
  static propTypes = {
    createTicket: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    getCategories: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { title: '', content: '', category: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createTicket(this.state);
    this.setState({
      title: '',
      content: '',
      category: '',
    });
  }

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Create Ticket</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input className="form-control" type="text" name="title" onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              id="content"
              rows="3"
              name="content"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.content}
            />
          </div>
          <div className="form-group">
            <label>category</label>
            <select
              name="category"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.category}
            >
              <option selected value="">
                ---
              </option>
              {this.props.categories.map((item, key) => {
                return <option value={item.id}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.tickets.categories,
});

export default connect(
  mapStateToProps,
  { createTicket, getCategories }
)(Form);
