import React from 'react';
import {Route,Redirect} from 'react-router-dom';
//import {connect} from 'react-redux';

const PrivateRoute=({component:Component,isLoggedIn,...rest})=>{
  return(
<Route {...rest}
render={(props)=>{
if(isLoggedIn){
  return <Component {...props}/>
}else{
  return <Redirect to={{pathname:'/login',state:{from:props.location}}}/>
}
}}/>
);
}
  
export default PrivateRoute;