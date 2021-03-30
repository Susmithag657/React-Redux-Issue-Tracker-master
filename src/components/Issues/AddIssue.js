import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { addIssue } from "../../actions/ActionCreators";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Prompt, useHistory } from "react-router-dom";

const AddIssue = ({ addIssue }) => {
  const initialVaues = {
    description: "",
    status: "",
    severity: "",
    dateCreated: new Date(),
    dateResolved: new Date()
  };
  const validationSchema = yup.object().shape({
    description: yup.string().required("Issue Description is required"),
    severity: yup.string(),
    status: yup.string(),
    dateCreated: yup.string().required("Please select date"),
    dateResolved: yup.string()
  });
  const history = useHistory();
  const notify = () =>
    toast.success(
      "added the task",
      { position: toast.POSITION.TOP_RIGHT },
      { autoClose: 2000 }
    );
  const onSubmit = (values, actions) => {
    console.log("values : " + values);
    const issue = {};
    issue.description = values.description;
    issue.status = values.status;
    issue.severity = values.severity;
    issue.dateCreated = values.dateCreated;
    issue.dateResolved = values.dateResolved;
    // alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(true);
    addIssue(issue)
      .then(() => {
        console.log("Issue Added!");
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
                      <div
                        className="alert alert-danger fs-6 form-text"
                        style={{ margin: "10px 240px 0px 240px" }}
                      >
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
                  <Field
                    className="form-select"
                    name="status"
                    as="select"
                    className="form-select"
                  >
                    <option>Select an option</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="InProgress">In Progress</option>
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
                      style={{ margin: "3px 10px 2px 10px" }}
                    />
                    Minor
                  </label>
                  <label className="form-check-label">
                    <Field
                      className="form-check-input"
                      type="radio"
                      value="Major"
                      name="severity"
                      style={{ margin: "3px 10px 2px 10px" }}
                    />
                    Major
                  </label>
                  <label className="form-check-label">
                    <Field
                      className="form-check-input"
                      type="radio"
                      value="Critical"
                      name="severity"
                      style={{ margin: "3px 10px 2px 10px" }}
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
                <div className="col-sm-4">
                  <DatePicker
                    className="form-control"
                    selected={values.dateCreated}
                    name="dateCreated"
                    dateFormat="dd MMMM,yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onChange={(value) => setFieldValue("dateCreated", value)}
                  />
                </div>

                <label
                  className="col-sm-2 col-form-label"
                  htmlFor="dateResolved"
                >
                  Date Resolved:
                </label>
                <div className="col-sm-2">
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

const mapDispatchtoProps = (dispatch) => {
  return {
    addIssue: (issue) => dispatch(addIssue(issue))
  };
};
export default connect(null, mapDispatchtoProps)(AddIssue);
