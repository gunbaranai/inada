import { combineReducers } from "redux";
import { fetchTicket } from './redTicket';
import { fetchAttachments } from './redAttachments';
import { fetchAuth } from './redLogin';

const rootReducers = combineReducers({
  authStore: fetchAuth,
  ticketStore: fetchTicket,
  attachmentStore: fetchAttachments,
});

export default rootReducers;
