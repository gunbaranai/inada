import { FETCH_TICKET, FAILED_TICKET, RECEIVE_TICKET } from '../actions/aTicket.js';

const defaultState = {
  data: [],
}

export function fetchTicket(state = defaultState, action){
  switch(action.type){
    case FETCH_TICKET:
      return Object({data: [], inProgress: true})
    case RECEIVE_TICKET:
      console.log(action.payload)
      return Object.assign({}, state, {data: action.payload, inProgress: false})
    case FAILED_TICKET:
      return ({data: [], inProgress: false})
    default:
      return state
  }
}
