import axios from 'axios';
import { createMessage } from './messages';
import { GET_TICKETS, DELETE_TICKET, CREATE_TICKET, GET_ERRORS } from './types';
import Cookies from 'js-cookie';

export const getTickets = () => (dispatch) => {
  axios
    .get('/api/tickets/')
    .then((res) => {
      // console.log(res);
      dispatch({
        type: GET_TICKETS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteTicket = (id) => (dispatch) => {
  axios
    .delete(`/api/tickets/${id}/`, { headers: { 'X-CSRFToken': Cookies.get('csrftoken') } })
    .then((res) => {
      dispatch(createMessage({ ticketDeleted: 'Ticket Deleted Successfully' }));
      dispatch({
        type: DELETE_TICKET,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

export const createTicket = (ticket) => (dispatch) => {
  axios({
    method: 'post',
    url: '/api/tickets/',
    data: ticket,
    headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
  })
    .then((res) => {
      dispatch(createMessage({ ticketCreated: 'Ticket Created Successfully' }));
      dispatch({
        type: CREATE_TICKET,
        payload: res.data,
      });
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};
