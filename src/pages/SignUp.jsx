// 
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

  const res = await app.post("/users", data);
  
  if (!res.ok) {
    console.error("An error has occurred!");
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
            <br></br>
            <input type="text" id={styles.box} name="username" placeholder="Enter username" />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <br></br>
            <input type="password" id={styles.box} name="password" placeholder="Enter password" />
          </div>

          <div>
            <label htmlFor="first-name">First Name:</label>
            <br></br>
            <input type="text" id={styles.box} name="firstName" placeholder="Enter firsname" />
          </div>

          <div>
            <label htmlFor="last-name">Last Name:</label>
            <br></br>
            <input type="text" id={styles.box} name="lastName" placeholder="Enter lastname"/>
          </div>

          <div>
            <label htmlFor="birthday">Birthday:</label>
            <br></br>
            <input type="date" name="birthday" id={styles.box} placeholder="Enter birthday"/>
          </div>

          <div>
            <label htmlFor="gender">Gender:</label>
            <br></br>
            <select name="gender" id={styles.box}>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="address">Address:</label>
            <br></br>
            <input type="text" name="address" id={styles.box} placeholder="Enter address"/>
          </div>

          <Button id="space" variant="primary" type="submit">
            Register
          </Button>
          <br></br>
          <Link to="/">
            <a>Have an account? Login here.</a>
          </Link>
        </Form>
      </div>
    </>
  );
}
