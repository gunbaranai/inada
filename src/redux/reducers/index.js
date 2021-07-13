import { combineReducers } from "redux";
import { fetchTicket } from './redTicket';
import { fetchAttachments } from './redAttachments';

const rootReducers = combineReducers({
  ticketStore: fetchTicket,
  attachmentStore: fetchAttachments,
});

export default rootReducers;
