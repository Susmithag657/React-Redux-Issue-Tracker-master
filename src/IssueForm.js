import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Descrition is required"),
  status: Yup.string(),
  severity: Yup.string()
});
//const intialValues
export default class IssueForm extends React.Component {
  constructor(props) {
    super(props);
    toast.configure();
  }

  onSubmit = function (values, { actions }) {
    //actions.setSubmitting=false;
    console.log(values);
  };

  notify = ()=>{ 
    toast('Hello Geeks') 
}
  render() {
    return (
      <>
        <Formik
          intialValues={
            (intialValues = {
              description: "",
              severity: "",
              status: ""
            })
          }
          validationSchema={validationSchema}
        >
          <Form>
            <label htmlFor="description">Description:</label>
            <Field type="input" name="description" id="description" />
            <ErrorMessage name="description" />
            <br />
            <label htmlFor="status">Status:</label>
            <Field name="status" as="select">
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="InProgress">InProgress</option>
            </Field>
            <br />
            <button type="submit" onClick={this.notify}>Save</button>
          </Form>
        </Formik>
      </>
    );
  }
}
