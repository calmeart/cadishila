import React, { useState } from "react";

function LoginForm() {

  const [loginInput, setLoginInput] = useState({
    username: "",
    password: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <form>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating mb-3">
          <input type="text" className="form-control" name="username" value={loginInput.username} onChange={handleChange} id="usernameInput" placeholder="Username" />
          <label htmlFor="usernameInput">Username</label>
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
