import React, { useContext, useState } from "react";
import { useMutation } from '@apollo/client';

import { AuthContext } from "../context/auth";
import { LoginUser } from '../graphql/queries';

function LoginForm(props) {
  const context = useContext(AuthContext);
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: ""
  });

  const [loginUser] = useMutation(LoginUser);

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const user = loginUser({
      variables: loginInput
    })
    user.then(result => {
      context.login(result.data.loginUser);
      setLoginInput({
        email: "",
        password: ""
      });
      props.history.push('/');
    }).catch(err => {
      console.log(err.message)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating mb-3">
          <input type="email" className="form-control" name="email" value={loginInput.email} onChange={handleChange} id="emailInput" placeholder="E-Mail" />
          <label htmlFor="usernameInput">E-mail Address</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" name="password" value={loginInput.password} onChange={handleChange} id="passwordInput" placeholder="Password" />
          <label htmlFor="passwordInput">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

      </form>
    </div>
  )
};

export default LoginForm;
