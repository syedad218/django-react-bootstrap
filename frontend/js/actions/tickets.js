import axios from 'axios';
import { GET_TICKETS } from './types';

export const getLeads = () => (dispatch) => {
  axios
    .get('/api/tickets/')
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_TICKETS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
