import React from "react";
import PropTypes from "prop-types";
import SearchForm from "components/Organism/SearchForm/SearchForm.js";
import JobList from "components/Organism/JobList/JobList.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { fetchJobList } from "../../redux/actions/aQuery";
import { connect } from "react-redux";

function Listing({...props}){

  const onSearchConfirm = (query) => {
    console.log(query);
    props.fetchJobList(query);
  }

  return (
    <div>
      <Card>
        <CardBody style={{padding: "48px 64px 64px 64px"}}>
          <SearchForm
            onConfirm={e => onSearchConfirm(e)}
          />
          <JobList data={props.jobsData} />
        </CardBody>
      </Card>
    </div>
  );
};

const jobsPropTypes = {
  jobsData: PropTypes.array,
  jobsProgress: PropTypes.bool,
  jobsError: PropTypes.bool,
  fetchJobList: PropTypes.func,
}

Listing.propTypes = jobsPropTypes

const mapStateToProps = (state) => {
  return {
    jobsData: state.jobsStore.data,
    jobsProgress: state.jobsStore.inProgress,
    jobsError: state.jobsStore.isError,
  }
}

export default connect(mapStateToProps, {fetchJobList})(Listing);
