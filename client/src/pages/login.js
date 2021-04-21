import React, { useState } from "react";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Login(props) {

  const [method, setMethod] = useState({
    login: true,
    register: false
  });

  function handleClick(e) {
    setMethod(prev => ({
      login: !prev.login,
      register: !prev.register
    }));
  };

  return (
    <div className="loginForm container">
      {method.login && <LoginForm history={props.history} appointError={props.appointError}/>}
      {method.register && <RegisterForm history={props.history} appointError={props.appointError}/>}
      <p className="pb-5" onClick={handleClick}> {method.login ? "Don't have an account? Click here to Register" : "Click here to return to the Login Page"} </p>
    </div>
  )
};

export default Login;
