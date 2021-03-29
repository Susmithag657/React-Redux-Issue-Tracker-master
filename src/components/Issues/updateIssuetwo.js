import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import { Prompt,useParams, useHistory } from "react-router-dom";
import {loadIssue} from '../../actions/ActionCreators';
import * as yup from "yup";
import { updateIssue } from "../../actions/ActionCreators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

const UpdateIssueComp = (props) => {
  const {loadIssue}=props;
  const {id} = useParams();
  const history = useHistory();
 // let initialValues = {};
  const [initialValues,SetInitialValues] = useState({id:'',description:'',status:'',severity:'',dateCreated:'',dateResolved:''}) 
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
     SetInitialValues({...issue});
   // initialValues={...issue};
    })},
   [] )

  const validationSchema = yup.object().shape({
    description: yup.string().required("Issue Description is required"),
    severity: yup.string().required('Required'),
    status: yup.string().required('Required'),
    dateCreated: yup.string().required("Please select date"),
    dateResolved: yup.string()
  });
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
        actions.setSubmitting(false);
        history.push("/issues");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
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
                    />
                    Minor
                  </label>
                  <label className="form-check-label">
                    <Field
                      className="form-check-input"
                      type="radio"
                      value="Major"
                      name="severity"
                    />
                    Major
                  </label>
                  <label className="form-check-label">
                    <Field
                      className="form-check-input"
                      type="radio"
                      value="Critical"
                      name="severity"
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
    updateIssue: (issue) => dispatch(updateIssue(issue)),
    loadIssue:(id)=>dispatch(loadIssue(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateIssueComp);