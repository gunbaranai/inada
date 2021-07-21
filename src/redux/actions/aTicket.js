import axios from "axios";

export const FETCH_TICKET = "FETCH_TICKET"
export const RECEIVE_TICKET = "RECEIVE_TICKET"
export const FAILED_TICKET = "FAILED_TICKET"

const fetchAll = (auth, ticketNumber) => {
  if(auth != undefined){
    return {
      method: "GET",
      headers: {
        Authorization: auth
      },
      url: "http://172.105.119.140:8086/api/report/all",
    }
  } else {
    return {
      method: "GET",
      url: "http://172.105.119.140:8086/api/report/all?report_code=" + ticketNumber,
    }
  }
}

export function fetchTicket(ticketNumber, auth = undefined){
  console.log(ticketNumber, auth)
  return (dispatch) => {
    dispatch({type: FETCH_TICKET})

    axios(fetchAll(auth, ticketNumber))
    .then((response) => {
      if(response.status == 200){
        if(response.data.status == "success"){
          if(response.data.data.length > 0){
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

export const clearTicketError = () => {
  return dispatch => {
    dispatch({type: FETCH_TICKET})
  }
}
