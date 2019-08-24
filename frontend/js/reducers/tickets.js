import { GET_TICKETS, DELETE_TICKET, CREATE_TICKET } from '../actions/types';

const initialState = {
  tickets: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
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
    default:
      return state;
  }
}