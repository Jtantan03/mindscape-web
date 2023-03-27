import React, { useEffect, useState } from "react";
// import "./Diary.css";
import { app } from "../../lib/fetch-wrapper";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

export function ProfileForm() {
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      const response = await app.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // const user = response.data[0];

      // setUsername(user.username);
      if (response.ok) {
        const entries = await response.json();

        setUsername(entries.data.username);
      }
    }
    fetchData();
  }, [token]);

  return (
    <>
      <div id={styles.toprmargin}>
        <div className="diary-form">
          {/* <img id={styles.round}
            src="components\Profile\defaultProfilePic\default-profile-pic.jpg"
            alt="Default profile picture"
            className="profile-picture-preview"
          />
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            className="profile-picture-input"
            name="profile_pic"
          /> */}

          <Link to="/profile" name="username" id={styles.linkD}>
            <h3>{username}</h3>
          </Link>
          <div id={styles.spaceborder}>
            <div id={styles.inborder}>
              <Link id={styles.linkD} to="/private" name="username">
                <h3>private</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
