import { FETCH_TICKET, FAILED_TICKET, RECEIVE_TICKET } from '../actions/aTicket.js';

const defaultState = {
  data: [],
}

export function fetchTicket(state = defaultState, action){
  switch(action.type){
    case FETCH_TICKET:
      return Object({data: [], inProgress: true, isError: false})
    case RECEIVE_TICKET:
      console.log(action.payload)
      return Object.assign({}, state, {data: action.payload, inProgress: false, isError: false})
    case FAILED_TICKET:
      return ({data: [], inProgress: false, isError: true})
    default:
      return state
  }
}
