import { FETCH_JOBS, FAILED_JOBS, RECEIVE_JOBS } from '../actions/aQuery.js';

const defaultState = {
  data: [],
}

export function fetchJobList(state = defaultState, action){
  switch(action.type){
    case FETCH_JOBS:
      return Object({data: [], inProgress: true})
    case RECEIVE_JOBS:
      console.log(action.payload)
      return Object.assign({}, state, {data: action.payload, inProgress: false})
    case FAILED_JOBS:
      return ({data: [], inProgress: false})
    default:
      return state
  }
}
