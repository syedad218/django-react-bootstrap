import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_TICKETS, DELETE_TICKET, CREATE_TICKET } from './types';
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
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
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
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
