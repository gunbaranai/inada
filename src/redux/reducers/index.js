import { combineReducers } from "redux";
import { fetchTicket } from './redTicket'

const rootReducers = combineReducers({
  ticketStore: fetchTicket,
});

export default rootReducers;
