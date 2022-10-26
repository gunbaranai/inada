import { combineReducers } from "redux";
import { fetchJobList } from './redQuery';

const rootReducers = combineReducers({
  jobsStore: fetchJobList
});

export default rootReducers;
