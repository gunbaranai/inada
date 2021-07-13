import axios from "axios";

export const FETCH_ATTACHMENTS = "FETCH_ATTACHMENTS"
export const RECEIVE_ATTACHMENTS = "RECEIVE_ATTACHMENTS"
export const FAILED_ATTACHMENTS = "FAILED_ATTACHMENTS"

export function fetchAttachments(reportId){
  console.log(reportId)
  return (dispatch) => {
    dispatch({type: FETCH_ATTACHMENTS})

    axios({
      method: "GET",
      url: "http://172.105.119.140:8086/api/report/get/attachment?report_id=" + reportId,
    })
    .then((response) => {
      if(response.status == 200){
        if(response.data.status == "success"){
          dispatch({
            type: RECEIVE_ATTACHMENTS,
            payload: response.data.data,
          })
        } else {
          console.log(response)
          dispatch({type: FAILED_ATTACHMENTS})
        }
      } else {
        console.log(response)
        dispatch({type: FAILED_ATTACHMENTS})
      }
    })
    .catch(function(error){
      console.log(error)
      dispatch({type: FAILED_ATTACHMENTS})
    })
  }
}
