
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { loginUser } from "../../actions/ActionCreators";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import {sign-in-alt} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
//<FontAwesomeIcon icon='sign-in-alt' />

toast.configure()
const LoginPage = ({message, loginUser }) => {
  const history = useHistory();
  const initialValues = { email: "", password: "" };
  const notify = () => toast.success('logIn successfully', 
  {position: toast.POSITION.TOP_RIGHT}, {autoClose:2000});
  const onSubmit = (values, actions) => {
    console.log(values);
    console.log(message);
    actions.setSubmitting = true;
    loginUser(values).then((res) => {
      console.log("Inside LoginForm....");
      if(res && res.length){
        notify()
        history.push("/issues");
       }else {
         console.log('validating fail message...');
         history.push("/login");
         actions.resetForm();
         toast.warning('logIn failed', 
         {position: toast.POSITION.TOP_RIGHT}, {autoClose:2000})
       }
    });
  };
  
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Please provide email"),
    password: yup
      .string()
      .required("Please provide password")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
    //   .test("Unique Email", "Please provide correct password", function(value){
    //     axios.get(`http://localhost:3005/users/?password=${value}`)
    //     .then((res) => {
    //       console.log(res.data);
    //       if (res.data.length > 0) {
    //         return false;
    //       }
    //       return true;
    //     })
    // }),
  });
  return (
    <div className="container align-content-center" style={{ marginTop: '20px' }}>
      <h1>Login Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
       
        {({isSubmitting})=>(
        <div className="container justify-content-center mt-3">
        <Form>
            <div className="input-group mb-3 row ">
              <label className="col-form-label col-sm-2 rounded" htmlFor="email">
                Username
              </label>
              <Field
                type="input"
                name="email"
                id="email"
                placeholder="Email"
                className="form-control col-sm-6"
              />

              <span>
                <ErrorMessage name="email">
                  {(msg) => <div className="alert alert-danger fs-6 form-text" style={{'margin': '10px 350px 0px 350px'}}>{msg}</div>}
                </ErrorMessage>
              </span>
            </div>
            <div className="input-group row mb-3">
              <label className="col-form-label col-sm-2" htmlFor="password">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="form-control col-sm-6"
              />

              <span>
              <ErrorMessage name="password">
                  {(msg) => <div className="alert alert-danger fs-6 form-text" style={{'margin': '10px 350px 0px 350px'}}>{msg}</div>}
                </ErrorMessage>
              </span>
            </div>
            <button type="submit" className="btn-primary rounded"  disabled={isSubmitting}>
              Login
            </button>
          </Form>
           </div>
        )}
          
       
      </Formik>
    </div>
  );
};
const mapStateToProps=(state)=>{
  return {
    message:state.user.message
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
