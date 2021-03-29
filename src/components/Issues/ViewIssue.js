import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {loadIssue} from '../../actions/ActionCreators';

const ViewIssue = (props) => {
  const {loadIssue}=props;
  const {id} = useParams();
  const history = useHistory();
  const [description,SetDescription]=useState('');
  const [status,SetStatus]=useState('');
  const [severity,SetSeverity]=useState('');
  const [dateCreated,SetDateCreated]=useState('');
  const [dateResolved,SetDateResolved]=useState('');
  useEffect(()=>{
    loadIssue(id).then(issue=>{
      SetDescription(issue.description);
      SetDateCreated(issue.dateCreated);
      SetDateResolved(issue.dateResolved);
      SetSeverity(issue.severity);
      SetStatus(issue.status);
    })},
    )

  return (
    <div>
      <div className="container" style = {{marginTop: '20Px'}}>
        <div className="mb-3 row ">
          <label htmlFor="desciption" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10 border pl-1">
            <input
              type="text"
              readonly
              className="form-control-plaintext"
              id="description"
              value={description}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="status" className="col-sm-2 col-form-label">
            Status
          </label>
          <div className="col-sm-10 border pl-1">
            <input
              type="text"
              readonly
              className="form-control-plaintext"
              id="status"
              value={status}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="severity" className="col-sm-2 col-form-label">
            Severity
          </label>
          <div className="col-sm-10 border pl-1">
            <input
              type="text"
              readonly
              className="form-control-plaintext"
              id="severity"
              value={severity}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="dueDate" className="col-sm-2 col-form-label">
            Date Created
          </label>
          <div className="col-sm-4 border pl-1">
            <input
              type="text"
              readonly
              className="form-control-plaintext"
              id="dateCreated"
              value={dateCreated && dateCreated}
            />
          </div>
          <label htmlFor="dueDate" className="col-sm-2 col-form-label">
            Date Resolved
          </label>
          <div className="col-sm-4 border pl-1">
            <input
              type="text"
              readonly
              className="form-control-plaintext"
              id="dateResolved"
              value={dateResolved && dateResolved}
            />
          </div>
        </div>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => history.goBack()}
        >
          Back
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    issues: state.issues.issues
  };
};
const mapDispatchToProps=(dispatch)=>{
  return {
    loadIssue:(id)=>dispatch(loadIssue(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewIssue);
