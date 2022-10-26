import axios from "axios";

export const FETCH_JOBS = "FETCH_JOBS"
export const RECEIVE_JOBS = "RECEIVE_JOBS"
export const FAILED_JOBS = "FAILED_JOBS"

export function fetchJobList(query){
  console.log(query);
  return (dispatch) => {
    dispatch({type: FETCH_JOBS})

    axios({
      method: "GET",
      url: "http://dev3.dansmultipro.co.id/api/recruitment/positions.json" + query,
    })
    .then((response) => {
      console.log(response);
      if(response.status == 200){
        dispatch({
          type: RECEIVE_JOBS,
          payload: response.data,
        })
      } else {
        console.log(response)
        dispatch({type: FAILED_JOBS})
      }
    })
    .catch(function(error){
      console.log(error)
      dispatch({type: FAILED_JOBS})
    })
  }
}
