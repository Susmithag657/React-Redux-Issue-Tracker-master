import React, { useState, useEffect } from "react";
import { Prompt, Link } from "react-router-dom";
import StatusLabel from "./StatusLabel";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteIssue, updateIssue } from "../../actions/ActionCreators";

const Issue = ({
  issue,
  deleteIssue,
  isLoggedIn,
  selected,
  filters,
  SetMultiDelete,
  multiDelete,
  updateIssue,
  ...rest
}) => {
  const showStatus = filters.includes("Status");
  const showSeverity = filters.includes("Severity");
  const showResolvedDate = filters.includes("Resolved Date");
  const showCreatedDate = filters.includes("Created Date");
  const handleDelete = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      deleteIssue(issue.id);
      notify();
    } else {
      toast.warning(
        "please login",
        { position: toast.POSITION.TOP_RIGHT },
        { autoClose: 2000 }
      );
    }
  };
  const notify = () =>
    toast.success(
      "Deleted Successfully",
      { position: toast.POSITION.TOP_RIGHT },
      { autoClose: 2000 }
    );
  const onSubmit = (values) => {
    // alert(JSON.stringify(values, null, 2));
    const issue = {};
    issue.id = values.id;
    issue.description = values.description;
    issue.status = values.status;
    issue.severity = values.severity;
    issue.count = values.count + 1;
    issue.dateCreated = new Date(values.dateCreated);
    issue.dateResolved = new Date(values.dateResolved);
    updateIssue(issue)
      .then(() => {
        console.log("Issue Updated!");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Prompt when={!isLoggedIn} message />
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-10 ">
            <div className="card shadow rounded mb-3">
              <div
                class="card-header justify-sm-content-start"
                style={{ backgroundColor: "#D3D3D3" }}
              >
                <div className="d-inline-flex flex-row justify-sm-content-start">
                  <div className="p-2 mt-2">
                    <input
                      type="checkbox"
                      checked={multiDelete[issue.id]}
                      onClick={(e) => {
                        let obj = multiDelete;
                        console.log(e);
                        if (e.target.checked) {
                          obj[issue.id] = 1;
                          SetMultiDelete({ ...multiDelete });
                        } else {
                          delete obj[issue.id];
                          SetMultiDelete({ ...multiDelete });
                        }
                        console.log(obj);
                      }}
                    />
                  </div>

                  <div className="p-2">
                    {showStatus ? <StatusLabel status={issue.status} /> : ""}
                  </div>
                  <div className="p-2 ">
                    {showSeverity ? (
                      <div className="label p-2 bg-secondary text-white ">
                        {issue.severity}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 justify-content-start">
                      <h5
                        className="card-title mb-2"
                        style={{ marginTop: "20Px" }}
                      >
                        {issue.description}
                      </h5>

                      <div className='row card-text">'>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">
                            <div>
                              {showCreatedDate
                                ? "Created Date - " +
                                  `${
                                    issue.dateResolved != null
                                      ? issue.dateCreated
                                          .split("")
                                          .splice(0, 10)
                                          .join("")
                                      : ""
                                  }`
                                : ""}
                            </div>
                          </li>
                          <li class="list-group-item">
                            <div>
                              {showResolvedDate
                                ? "Resolved Date - " +
                                  `${
                                    issue.dateResolved != null
                                      ? issue.dateResolved
                                          .split("")
                                          .splice(0, 10)
                                          .join("")
                                      : ""
                                  }`
                                : ""}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="d-flex flex-column col-md-2 ">
                      <Link
                        to={`/issues/${issue.id}`}
                        className="btn btn-sm btn-primary mb-1 text-decoration-none text-nowrap"
                      >
                        View
                      </Link>
                      <br />
                      <Link
                        to={`/updateissue/${issue.id}`}
                        className="btn btn-sm btn-primary mb-1 text-decoration-none text-nowrap"
                      >
                        Edit
                      </Link>
                      <br />

                      <Link
                        to="#"
                        className="btn btn-sm btn-primary mb-1 text-decoration-none text-nowrap"
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
