import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { updateIssue } from "../../actions/ActionCreators";
import { Prompt, useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const UpdateIssueComp = ({ issues, updateIssue }) => {
  const { id } = useParams();
  const history = useHistory();
  let Issue = issues && issues.length && issues
      .filter((issue) => issue && (issue.id === id))
      if(Issue && Issue.length){
        Issue =  Issue.reduce((result, item) => {
          var key = Object.keys(item)[0];
          result[key] = item[key];
          return result;
        });
      }
  const initialVaues = {
    id: Issue.id,
    description: Issue.description,
    status: Issue.status,
    severity: Issue.severity,
    dateCreated: Date.parse(Issue.dateCreated),
    dateResolved: Date.parse(Issue.dateResolved)
  };
  const validationSchema = yup.object().shape({
    description: yup.string().required("Issue Description is required"),
    severity: yup.string(),
    status: yup.string(),
    dateCreated: yup.string().required("Please select Due date"),
    dateResolved: yup.string()
  });
  const notify = () => toast.success('updated the task', 
  {position: toast.POSITION.TOP_RIGHT}, {autoClose:2000});
  const onSubmit = (values, actions) => {
    // alert(JSON.stringify(values, null, 2));
    const issue = {};
    issue.id = id;
    issue.description = values.description;
    issue.status = values.status;
    issue.severity = values.severity;
    issue.dateCreated = values.dateCreated;
    issue.dateResolved = values.dateResolved;
    // alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(true);
    updateIssue(issue)
      .then(() => {
        console.log("Issue Updated!");
        notify();
        actions.setSubmitting(false);
        history.push("/issues");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Formik
        initialValues={initialVaues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, values, setFieldValue }) => (
          <Form className="form-group mt-5">
            <Prompt
              when={!isValid}
              message={
                "You have unsaved changes, are you sure you want to leave?"
              }
            />
            <div className="container ">
              <div className="row ">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="description"
                >
                  Description
                </label>
                <div className="col-sm-8">
                  <Field
                    className="form-control"
                    type="input"
                    id="description"
                    name="description"
                  />
                  <ErrorMessage name="description">
                    {(msg) => (
                      <div className="alert alert-danger fs-6 form-text">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <br />
              <div className="row ">
                <label className="col-sm-2 col-form-label" htmlFor="status">
                  Status:
                </label>
                <div className="col-sm-8">
                  <Field className="form-select" name="status" as="select">
                    <option>Select an option</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="InProgress">InProgress</option>
                  </Field>
                </div>
              </div>
              <br />
              <div className="row">
                <label className="col-sm-2 col-form-label" htmlFor="severity">
                  Severity:
                </label>
                <div className="col-sm-8 justify-content-start">
                  <label className="form-check-label mr-2">
                    <Field
                      className="form-check-input"
                      type="radio"
                      value="Minor"
                      name="severity"
                      style={{margin:'3px 10px 2px 10px'}}
                    />
                    Minor
                  </label>
                  <label className="form-check-label">
                    <Field
                      className="form-check-input"
                      type="radio"
                      value="Major"
                      name="severity"
                      style={{margin:'3px 10px 2px 10px'}}
                    />
                    Major
                  </label>
                  <label className="form-check-label">
                    <Field
                      className="form-check-input"
                      type="radio"
                      value="Critical"
                      name="severity"
                      style={{margin:'3px 10px 2px 10px'}}
                    />
                    Critical
                  </label>
                </div>
              </div>
              <br />
              <div className="row">
                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="dateCreated"
                >
                  Date Created:
                </label>
                <div className="col-sm-3">
                  <DatePicker
                    className="form-control"
                    selected={values.dateCreated}
                    name="dateCreated"
                    dateFormat="dd MMMM,yyyy"
                    onChange={(value) => setFieldValue("dateCreated", value)}
                  />
                </div>

                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="dateResolved"
                >
                  Date Resolved:
                </label>
                <div className="col-sm-4">
                  <DatePicker
                    className="form-control"
                    selected={values.dateResolved}
                    name="dateResolved"
                    dateFormat="dd MMMM,yyyy"
                    minDate={values.dateCreated}
                    onChange={(value) => setFieldValue("dateResolved", value)}
                  />
                </div>
              </div>
              <br />
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    issues: state.issues.issues
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateIssue: (issue) => dispatch(updateIssue(issue))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateIssueComp);

// export default connect(mapStatetoProps, mapDispatchToProps)(UpdateIssue);
