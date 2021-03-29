import React, { useState, useEffect } from "react";
import { Prompt, Link } from "react-router-dom";
import StatusLabel from "./StatusLabel";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteIssue } from "../../actions/ActionCreators";

const Issue = ({
  issue,
  deleteIssue,
  isLoggedIn,
  selected,
  filters,
  SetMultiDelete,
  multiDelete,
  ...rest
}) => {
  const showStatus = filters.includes("Status");
  const showSeverity = filters.includes("Severity");
  const showResolvedDate = filters.includes("Resolved Date");
  const showCreatedDate = filters.includes("Created Date");
  const handleDelete = (e) => {
    e.preventDefault();
    deleteIssue(issue.id);
  };
  const notify = () => toast.success('Deleted Successfully', 
  {position: toast.POSITION.TOP_RIGHT}, {autoClose:2000});

  return (
    <>
      <Prompt when={!isLoggedIn} message />
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-10 ">
            <div className="card shadow rounded mb-3">
              <div className="card-body">
                <div className="container">
                  <div className="row">
                    
                 
                    <div className="d-flex flex-column col-md-2 border-end">
                    <div>
                    <input
                type="checkbox" checked={multiDelete[issue.id]}
                onClick={(e)=>{
                  let obj = multiDelete
                  console.log(e)
                  if(e.target.checked){
                    obj[issue.id] = 1
                    SetMultiDelete({...multiDelete})
                  } else{
                    delete obj[issue.id]
                    SetMultiDelete({...multiDelete})
                  }
                  console.log(obj)
                }}
              />
                    </div>
                      {showStatus ? <StatusLabel status={issue.status} /> : ""}
                      <div className="label mt-2 p-2 bg-other ">
                        {showSeverity ? issue.severity : ""}
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="container">
                        <div className="row">
                          <h5 className="card-title mb-4 justify-content-start" style = {{marginTop: '20Px'}}>
                            {issue.description}
                          </h5>
                        </div>
                        <div className='row card-text">'>
                          <div className="col-sm-4 align-items-end" style = {{marginLeft: '90Px'}}>
                            {showResolvedDate
                              ? "Resolved Date - " + issue.dateResolved
                              : ""}
                          </div>
                          <div className="col-sm-4 align-items-end">
                            {showCreatedDate
                              ? "Created Date - " + issue.dateCreated
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-column col-md-2 ">
                      <Link
                        to={`/issues/${issue.id}`}
                        className="btn btn-primary mb-1 text-decoration-none text-nowrap"
                      >
                        View
                      </Link>
                      <br />
                      <Link
                        to={`/updateissue/${issue.id}`}
                        className="btn btn-primary mb-1 text-decoration-none text-nowrap"
                      >
                        Edit
                      </Link>
                      <br />

                      <Link
                        to="#"
                        className="btn btn-primary mb-1 text-decoration-none text-nowrap"
                        onClick={(e) => {
                          handleDelete(e);
                          notify();
                        }}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8"></div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteIssue: (id) => dispatch(deleteIssue(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Issue);