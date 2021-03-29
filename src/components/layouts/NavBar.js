import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const NavBar = (props) => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-primary mr-auto"
        style={{ color: "white" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Issue Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto navbar-right">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/issues">
                  Issues
                </Link>
              </li>

              {props.isLoggedIn ? (
                <div className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/user">
                      {props.profile.firstName}
                    </Link>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      SignUp
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    isLoggedIn: state.user.isLoggedIn
  };
};
export default connect(mapStateToProps, null)(NavBar);
