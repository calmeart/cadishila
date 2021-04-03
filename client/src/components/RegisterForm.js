import React, { useState } from "react";
import { useMutation } from '@apollo/client';

import { RegisterUser } from '../graphql/queries';

function RegisterForm() {

  const [registerInput, setRegisterInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [registerUser] = useMutation(RegisterUser);

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  function handleSubmit(e) {
    const { username, email, password, confirmPassword} = registerInput;
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('Confirm Password is wrong');
      return;
    }
    const user = registerUser({
      variables: {
        username,
        email,
        password
      }
    })
    user.then(result => {
      console.log(result);
      setRegisterInput({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      })
    }).catch(err => {
      console.log(err.message)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating mb-3">
          <input type="text" className="form-control" name="username" value={registerInput.username} onChange={handleChange} id="usernameInput" placeholder="Username" />
          <label htmlFor="usernameInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" name="email" value={registerInput.email} onChange={handleChange} id="emailInput" placeholder="E-Mail" />
          <label htmlFor="emailInput">E-Mail</label>
        </div>

        <div className="form-floating mb-3">
          <input type="password" className="form-control" name="password" value={registerInput.password} onChange={handleChange} id="passwordInput" placeholder="Password" />
          <label htmlFor="passwordInput">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" name="confirmPassword" value={registerInput.confirmPassword} onChange={handleChange} id="confirmPasswordInput" placeholder="Reenter Password" />
          <label htmlFor="passwordInput">Reenter Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

      </form>
    </div>
  )
};

export default RegisterForm;
