import React, { useState } from "react";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Login() {

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
    <div className="loginForm">
    {method.login && <LoginForm />}
    {method.register && <RegisterForm />}
    <p onClick={handleClick}> {method.login ? "Don't have an account? Click here to Register" : "Click here to return Login"} </p>
    </div>
  )
};

export default Login;
