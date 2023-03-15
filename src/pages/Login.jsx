import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { app } from "../../lib/fetch-wrapper";
import { Link } from "react-router-dom";
import './loginSign.module.css'
import { useState } from "react";

// this is for n / go back do dashboard while login
export function loader() {
  console.log("Open login");
  if (localStorage.getItem("token")) {
    return (window.location.href = "/dashboard");
  }
  return null;
}

// this is for login in verifications / token / authentication
export async function action(request) {
  const res = await app.post("/login", request);

  if (!res.ok) {
    const error = await res.json();
    console.error("An error has occurred:", error.err);

    // Display a notification to the user
    alert(error.err); // Or use a more sophisticated notification component

    return null;
  }

  const { token } = await res.json();
  localStorage.setItem("token", token); // for dashboard localStorage.token or gettoken( 'token', token )
  return (window.location.href = "/dashboard");
}


export function LogIn() {
  const [loginError, setLoginError] = useState(null); // <-- Add state variable

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const data = {
      username: username,
      password: password,
    };
    console.log(data);
    const result = await action(data);

    if (!res.ok) {
      alert("Invalid username or password");
      return;
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>

      <Form className="bc" onSubmit={handleSubmit} id="spc">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
        {loginError && <div className="error">{loginError}</div>} {/* <-- Display the error message */}
        <br></br>
        <Link to="/sign-up">
          <a>
            {" "}
            Don't have an account? Register here.<br></br>{" "}
          </a>
        </Link>
      </Form>
    </div>
  );
}