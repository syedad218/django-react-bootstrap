import {
  GET_TICKETS,
  DELETE_TICKET,
  CREATE_TICKET,
  UPDATE_TICKET,
  GET_CATEGORIES,
  GET_TICKET_DETAILS,
} from '../actions/types';
import _ from 'lodash';
const initialState = {
  tickets: [],
  categories: [],
  activeTicket: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket.id !== action.payload),
      };
    case CREATE_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    case UPDATE_TICKET:
      return {
        ...state,
      };
    case GET_TICKET_DETAILS:
      return {
        ...state,
        activeTicket: action.payload,
      };
    default:
      return state;
  }
}
