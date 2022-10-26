import React from "react";
import PropTypes from "prop-types";

export default function JobList(props){

  return (
    <div>
      {props.data.map((detail, key) => {
        console.log(detail);
        return (
          <div
          key={key}>
            <h3>{detail.title}</h3>
            <h4>{detail.company} - {detail.type}</h4>
          </div>
        );
      })}
    </div>
  )
}

JobList.propTypes = {
  data: PropTypes.func,
};
