import { FETCH_ATTACHMENTS, FAILED_ATTACHMENTS, RECEIVE_ATTACHMENTS } from '../actions/aAttachments.js';

const defaultState = {
  data: [],
}

export function fetchAttachments(state = defaultState, action){
  switch(action.type){
    case FETCH_ATTACHMENTS:
      return Object({data: [], inProgress: true})
    case RECEIVE_ATTACHMENTS:
      console.log(action.payload)
      return Object.assign({}, state, {data: action.payload, inProgress: false})
    case FAILED_ATTACHMENTS:
      return ({data: [], inProgress: false})
    default:
      return state
  }
}
