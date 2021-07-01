import axios from "axios";

export const FETCH_TICKET = "FETCH_TICKET"
export const RECEIVE_TICKET = "RECEIVE_TICKET"
export const FAILED_TICKET = "FAILED_TICKET"

export function fetchTicket(ticketNumber){
  console.log(ticketNumber)
  return (dispatch) => {
    dispatch({type: FETCH_TICKET})

    axios({
      method: "GET",
      url: "http://172.105.119.140:8086/api/report?report_code=" + ticketNumber,
    })
    .then((response) => {
      if(response.status == 200){
        if(response.data.status == "success"){
          dispatch({
            type: RECEIVE_TICKET,
            payload: response.data.data,
          })
        } else {
          console.log(response)
          dispatch({type: FAILED_TICKET})
        }
      } else {
        console.log(response)
        dispatch({type: FAILED_TICKET})
      }
    })
    .catch(function(error){
      console.log(error)
      dispatch({type: FAILED_TICKET})
    })
  }
}
