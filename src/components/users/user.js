import React from "react";
import { connect } from "react-redux";
import {  useHistory } from "react-router-dom";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { logOutUser } from "../../actions/ActionCreators";

toast.configure()
const user = ({ profile, logOutUser }) => {
  const history = useHistory();
  const handleLogOut=(e)=>{
    e.preventDefault();
    logOutUser();
    history.push('/login');
  }
  const notify = () => toast.success('logout successfully', 
  {position: toast.POSITION.TOP_RIGHT}, {autoClose:1000});
  return (
    <div
      className="container user-form"
      style={{ marginTop: "20px", textAlign: "left" }}
    >
      <div class="card text-center">
        <div
          class="card-header"
          style={{ backgroundColor: "lightseagreen", color: "white" }}
        >
          My Profile
        </div>
        <div class="card-body">
          <div className="container justify-content-center">
            <div className="input-group mb-3 row ">
              <label
                className="col-form-label col-sm-2 rounded"
                htmlFor="email"
                style={{ textAlign: "left" }}
              >
                Full Name
              </label>
              <div className="col-sm-6 border">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={`${profile.firstName}` + " " + `${profile.lastName}`}
                />
              </div>
            </div>

            <div className="input-group row mb-3">
              <label
                className="col-form-label col-sm-2"
                htmlFor="password"
                style={{ textAlign: "left" }}
              >
                Email
              </label>
              <div className="col-sm-6 border">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={`${profile.email}`}
                />
              </div>
            </div>

            <div className="input-group row mb-3">
              <label
                className="col-form-label col-sm-2"
                htmlFor="password"
                style={{ textAlign: "left" }}
              >
                Mobile Number
              </label>
              <div className="col-sm-6 border">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={`${profile.mobileNumber}`}
                />
              </div>
            </div>

            <div className="input-group row mb-3">
              <label
                className="col-form-label col-sm-2"
                style={{ textAlign: "left" }}
                htmlFor="password"
              >
                Location
              </label>
              <div className="col-sm-6 border">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={`${profile.location}`}
                />
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={(e) => {
                handleLogOut(e);
                notify();
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(logOutUser())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(user);
