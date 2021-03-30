import React, { useState } from "react";
import { connect } from "react-redux";
import Issue from "../Issues/Issue";
import { Link } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  filterIssuesByStatus,
  filterIssuesByDescription,
  filterIssuesBySeverity,
  setVisibilityFilter,
  deleteIssue
} from "../../actions/ActionCreators";

const Issues = ({
  issues,
  filterIssuesByDescription,
  filterIssuesBySeverity,
  filterIssuesByStatus,
  setVisibilityFilter,
  visibleFilters,
  sortByFilters,
  isLoggedIn,
  deleteIssue
}) => {
  const options = [
    { name: "Status", id: 1 },
    { name: "Severity", id: 2 },
    { name: "Created Date", id: 3 },
    { name: "Resolved Date", id: 4 }
  ];
  const [multiDelete, SetMultiDelete] = useState({})
  const selectedValues = options.reduce((acc, i) => {
    if (visibleFilters.includes(i.name)) {
      acc.push(i);
    }
    return acc;
  }, []);
  const multiselectRef = React.createRef();
  const onSelect = (selectedList, selectdItem) => {
    const item =
      selectedList.length &&
      selectedList.reduce((acc, i) => {
        acc.push(i.name);
        return acc;
      }, []);

    setVisibilityFilter(item);
    console.log(item);
  };
  const onRemove = (selectedList, removedItem) => {
    const item =
      selectedList.length &&
      selectedList.reduce((acc, i) => {
        acc.push(i.name);
        return acc;
      }, []);
    console.log(item);
    setVisibilityFilter(item);
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    filterIssuesByDescription(e.target.value);
  };
  const handleSeverityFilter = (e) => {
    e.preventDefault();
    filterIssuesBySeverity(e.target.value);
  };
  const handleStatusFilter = (e) => {
    e.preventDefault();
    filterIssuesByStatus(e.target.value);
  };
  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div className="row m-2 mx-auto justify-content-start">
        <div className="col-md-10" style={{ margin: "10px 0px 10px 110px" }}>
          <Multiselect
            options={options}
            displayValue="name"
            showCheckbox={true}
            onSelect={onSelect}
            onRemove={onRemove}
            ref={multiselectRef}
            placeholder="Select to Customize"
            selectedValues={selectedValues}
            closeIcon="cancel"
            closeOnSelect={true}
            hidePlaceholder={true}
          />
        </div>
      </div>
      <div
        className="d-flex flex-row justify-content-evenly mb-4"
        style={{ marginLeft: "60px" }}
      >
        <div className="col-sm-3">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => handleSeverityFilter(e)}
          >
            <option value="All" selected>
              Severity All
            </option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div className="col-sm-2">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => handleStatusFilter(e)}
          >
            <option value="All" selected>
              Status All
            </option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="InProgress">In Progress</option>
          </select>
        </div>
        <div className="col-sm-1" style={{ marginLeft: "10px" }}>
          <input
            onChange={(e) => handleFilterChange(e)}
            className="form-control rounded"
            type="text"
            id="filterBy"
            name="filterBy"
            placeholder="Search By"
          />
        </div>
        <div className="col-sm-3">
          <Link
            className="btn btn-sm btn-primary"
            onClick={() => {
              if (isLoggedIn) {
                deleteIssue(Object.keys(multiDelete));
              } else {
                toast.warning(
                  "please login",
                  { position: toast.POSITION.TOP_RIGHT },
                  { autoClose: 2000 }
                );
              }
            }}
          >
            Delete Multiple
          </Link>
        </div>
        <div className="col-sm-2" style={{ marginRight: "30px" }}>
          <Link className="btn btn-sm btn-primary" to="/addIssue">
            Add Issue
          </Link>
        </div>
      </div>
      {issues &&
        issues.map((issue) => (
          <Issue
            multiDelete={multiDelete}
            SetMultiDelete={SetMultiDelete}
            key={issue.id}
            issue={issue}
            filters={visibleFilters}
          />
        ))}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    issues: state.issues.issues,
    visibleFilters: state.issues.visibilityFilter,
    sortByFilters: state.issues.filters,
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterIssuesByDescription: (filter) =>
      dispatch(filterIssuesByDescription(filter)),
    filterIssuesBySeverity: (filter) =>
      dispatch(filterIssuesBySeverity(filter)),
    filterIssuesByStatus: (filter) => dispatch(filterIssuesByStatus(filter)),
    setVisibilityFilter: (filter) => dispatch(setVisibilityFilter(filter)),
    deleteIssue: (id) => dispatch(deleteIssue(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Issues);