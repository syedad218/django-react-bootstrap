import axios from 'axios';
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
    .catch((err) => console.log(err));
};

export const deleteTicket = (id) => (dispatch) => {
  axios
    .delete(`/api/tickets/${id}/`, { headers: { 'X-CSRFToken': Cookies.get('csrftoken') } })
    .then((res) => {
      // console.log(res);
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
      // console.log(res);
      dispatch({
        type: CREATE_TICKET,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
