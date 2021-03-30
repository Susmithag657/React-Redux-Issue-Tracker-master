import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Prompt, useHistory, Link } from "react-router-dom";
import * as yup from "yup";
import { connect } from "react-redux";
import { addUser } from "../../actions/ActionCreators";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = ({ addUser }) => {
  const history = useHistory();
  const notify = () => toast.success('signUp successfully', 
  {position: toast.POSITION.TOP_RIGHT}, {autoClose:2000});
  const onSubmit = (values, action) => {
    action.setSubmitting = true;
    console.log("values :" + values);
    addUser(values)
      .then((res) => {
        console.log(res);
        notify();
        action.setSubmitting = false;
        action.resetForm();
        history.push("/Home");
      })
      .catch((err) => console.log(err));
  };
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Please provide First Name"),
    lastName: yup.string().required("Please provide Last Name"),
    email: yup.string().email("Invalid email").required("Please provide email"),
    // .test("Unique Email", "This email already exists", function(value){
    //     axios.get(`http://localhost:3005/users/?email=${value}`)
    //     .then((res) => {
    //       console.log(res.data);
    //       if (res.data.length > 0) {
    //         return false;
    //       }
    //       return true;
    //     })
    // }),
    mobileNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    password: yup
      .string()
      .required("Please provide password")
      .min(8, "Password should be 8 chars minimum.")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Passord must have one uppercase, one number and one special case character"
      ),
    location: yup.string().required("Required"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .when("password", {
        is: (password) => (password && password.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Password doesn't match")
      })
  });
  // const notify = () => toast.success('logIn successfully', 
  // {position: toast.POSITION.TOP_RIGHT}, {autoClose:2000});
  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-lg-6">
          <div className="card shadow mt-5 ml-5" style={{ width: "auto" }}>
            <div
              class="card-header text-center"
              style={{ backgroundColor: "lightseagreen", color: "white" }}
            >
              <h2>Sign Up!</h2>
            </div>
            <div className="card-body">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  mobileNumber: "",
                  location: "",
                  password: "",
                  confirmPassword: ""
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isValid, isSubmitting }) => (
                  <Form>
                    <Prompt
                      when={!isValid}
                      message="You have unsaved changes, are you sure you want to leave?"
                    />
                    <div className="form-floating mb-3">
                      <Field
                        type="input"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                        className="form-control"
                      />
                      <label htmlFor="firstName">First Name</label>
                      <span>
                        <ErrorMessage
                          className="alert alert-danger"
                          name="firstName"
                        >
                          {(msg) => (
                            <div
                              className="alert alert-danger"
                              style={{ margin: "10px 0px" }}
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        type="input"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        className="form-control"
                      />
                      <label htmlFor="lastName">Last Name</label>
                      <span>
                        <ErrorMessage name="lastName">
                          {(msg) => (
                            <div
                              className="alert alert-danger"
                              style={{ margin: "10px 0px" }}
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        type="input"
                        name="email"
                        id="email"
                        placeholder="User Name"
                        className="form-control"
                      />
                      <label htmlFor="email">Email</label>

                      <span>
                        <ErrorMessage name="email">
                          {(msg) => (
                            <div
                              className="alert alert-danger"
                              style={{ margin: "10px 0px" }}
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        type="input"
                        name="mobileNumber"
                        id="mobileNumber"
                        placeholder="Mobile Number"
                        className="form-control"
                      />
                      <label htmlFor="mobileNumber">Mobile Number</label>

                      <span>
                        <ErrorMessage name="mobileNumber">
                          {(msg) => (
                            <div
                              className="alert alert-danger"
                              style={{ margin: "10px 0px" }}
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>

                    <div className="form-floating mb-3">
                      <Field
                        type="input"
                        name="location"
                        id="location"
                        placeholder="Location"
                        className="form-control"
                      />
                      <label htmlFor="location">Location</label>

                      <span>
                        <ErrorMessage name="location">
                          {(msg) => (
                            <div
                              className="alert alert-danger"
                              style={{ margin: "10px 0px" }}
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>

                    <div className="form-floating mb-3">
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="form-control"
                      />
                      <label htmlFor="password">Password</label>

                      <span>
                        <ErrorMessage name="password">
                          {(msg) => (
                            <div
                              className="alert alert-danger"
                              style={{ margin: "10px 0px" }}
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Password"
                        className="form-control"
                      />
                      <label htmlFor="confirmPassword">Confirm</label>
                      <span>
                        <ErrorMessage name="confirmPassword">
                          {(msg) => (
                            <div
                              className="alert alert-danger"
                              style={{ margin: "10px 0px" }}
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn-primary rounded"
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div
              class="card-footer jsutify-content-center"
              style={{ backgroundColor: "lightseagreen", color: "white" }}
            >
              Already registered?{" "}
              <span>
                <Link to="/login" style={{ color: "blue" }}>
                  Login
                </Link>
              </span>{" "}
              here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user))
  };
};
export default connect(null, mapDispatchToProps)(SignUpForm);
