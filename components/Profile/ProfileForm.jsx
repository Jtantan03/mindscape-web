import React from "react"
// import './Diary.css'
import { Form, redirect } from "react-router-dom";
import { app } from "../../lib/fetch-wrapper";
import { Link } from "react-router-dom";

export async function action({ request }) {
  console.log(action)
  const data = Object.fromEntries(await request.formData());
  const res = await app.get("/users/:id", data);

  if (!res.ok) {
    console.error("An error has occurred!");
    return null;
  }
  const user = await res.json();
  return { user };

}

export function ProfileForm() {
  return (
    <>
      <div>
        <Form method="post" className="register-form">
          <div className="diary-form">
            {/* <label htmlFor="profile-picture">Profile Picture:</label> */}
            <img
              src='components\Profile\defaultProfilePic\default-profile-pic.jpg'
              alt="Default profile picture"
              className="profile-picture-preview"
            />
            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              className="profile-picture-input"
              name="profile_pic"
              // defaultValue={defaultProfilePic}
            />
            <h3>John Michael</h3>
          </div>

          
        </Form>
      </div>
    </>
  );
}