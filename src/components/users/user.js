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
    <div className="container" style={{marginTop:'20px'}}>
      <div className="row justify-content-start">
        <div className="col-2">
          <label className="" htmlFor="fullName">
            Full Name
          </label>
        </div>
        <div className="col-4">
          {profile.firstName} {profile.lastName}
        </div>
      </div>
      <div className="row justify-content-start">
        <div className="col-2">
          <label className="" htmlFor="email">
            email
          </label>
        </div>
        <div className="col-4">{profile.email}</div>
      </div>
      <div className="row justify-content-start">
        <div className="col-2">
          <label className="" htmlFor="mobileNumber">
            Mobille Number
          </label>
        </div>
        <div className="col-4">{profile.mobileNumber}</div>
      </div>
      <div className="row justify-content-start">
        <div className="col-2">
          <label className="" htmlFor="location">
            Location
          </label>
        </div>
        <div className="col-4">{profile.location}</div>
      </div>
      <button className="btn btn-primary" onClick={(e) => {
          handleLogOut(e);
          notify();
        }}>
        Log Out
      </button>
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
