import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_TICKETS, DELETE_TICKET, CREATE_TICKET, GET_CATEGORIES } from './types';
// import Cookies from 'js-cookie';
import { tokenConfig } from './auth';

export const getTickets = () => (dispatch, getState) => {
  axios
    .get('/api/tickets/', tokenConfig(getState))
    .then((res) => {
      // console.log(res);
      dispatch({
        type: GET_TICKETS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getCategories = () => (dispatch, getState) => {
  axios
    .get('/api/category/', tokenConfig(getState))
    .then((res) => {
      // console.log(res);
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteTicket = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/tickets/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ ticketDeleted: 'Ticket Deleted Successfully' }));
      dispatch({
        type: DELETE_TICKET,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

export const createTicket = (ticket) => (dispatch, getState) => {
  axios
    .post('/api/tickets/', ticket, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ ticketCreated: 'Ticket Created Successfully' }));
      dispatch({
        type: CREATE_TICKET,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
