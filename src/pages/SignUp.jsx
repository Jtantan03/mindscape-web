import { Form, redirect } from "react-router-dom";
import { app } from "../../lib/fetch-wrapper";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import '../App.css';
import styles from './loginSign.module.css';

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());

  // Check if any input is missing
  for (const [key, value] of Object.entries(data)) {
    if (value.trim() === '') {
      alert(`Please enter a value for ${key}`);
      return null;
    }
  }

  // Check if password and confirm password fields match
  if (data.password !== data.confirmPassword) {
    alert("Password and confirm password fields don't match");
    return null;
  }

  // Remove the confirm password field from the data object
  delete data.confirmPassword;

  const res = await app.post("/users", data);

  if (!res.ok) {
    alert("username already exist"); // Alert the error message returned by the server
    return null;
  }

  return redirect("/");
}

export function SignUp({ hasError }) {
  return (
    <>
      <div className="auth-form-container">
        <h1>Register</h1>
        {hasError && <p>An error has occurred. Please try again...</p>}
        <Form action="/sign-up" method="post" className="register-form">
          <div>
            <label htmlFor="username">Username:</label>
            <br />
            <input type="text" id={styles.box} name="username" placeholder="Enter username" />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <br />
            <input type="password" id={styles.box} name="password" placeholder="Enter password" />
          </div>

          <div>
            <label htmlFor="confirm-password" >Confirm Password:</label>
            <br />
            <input type="password" id={styles.box} name="confirmPassword" placeholder="Enter confirm password" />
          </div>

          <div>
            <label htmlFor="first-name">First Name:</label>
            <br />
            <input type="text" id={styles.box} name="firstName" placeholder="Enter first name" />
          </div>

          <div>
            <label htmlFor="last-name">Last Name:</label>
            <br />
            <input type="text" id={styles.box} name="lastName" placeholder="Enter last name" />
          </div>

          <div>
            <label htmlFor="birthday">Birthday:</label>
            <br />
            <input type="date" name="birthday" id={styles.box} placeholder="Enter birthday" />
          </div>

          <div>
            <label htmlFor="gender">Gender:</label>
            <br />
            <select name="gender" id={styles.box}>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="address">Address:</label>
            <br />
            <input type="text" name="address" id={styles.box} placeholder="Enter address" />
          </div>

          <Button id="space" variant="primary" type="submit">
            Register
          </Button>
          <br />
          <Link to="/">
            <a>Have an account? Login here.</a>
          </Link>
        </Form>
      </div>
    </>
  );
}
