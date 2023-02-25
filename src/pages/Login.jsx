import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { app } from "../../lib/fetch-wrapper";
import { Link } from "react-router-dom";

// this is for token / go back do dashboard while login
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
    console.error("An error has occurred");
    return null;
  }

  const { token } = await res.json();
  localStorage.setItem("token", token); // for dashboard localStorage.token or gettoken( 'token', token )
  return (window.location.href = "/dashboard");
}

export function LogIn() {
  // this is for validation of the users
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const data = {
      username: username,
      password: password,
    };
    console.log(data);
    action(data);
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
