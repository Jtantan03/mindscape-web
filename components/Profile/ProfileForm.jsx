// import React from "react"
// import './Diary.css'
// import { Form, redirect } from "react-router-dom";
// import { app } from "../../lib/fetch-wrapper";
// import { Link } from "react-router-dom";
// import React, { useEffect, useState } from "react";

// // export function loader() {
// //   console.log("Open login");
// //   if (localStorage.getItem("token")) {
// //     return (window.location.href = "/dashboard");
// //   }
// //   return null;
// // }
// // export function DiaryList() {
// //   const [diaryEntries, setDiaryEntries] = useState([]);
// //   const [username, setUsername] = useState("");
// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     async function fetchUsername() {
// //       const res = await app.get("/users/me", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       if (res.ok) {
// //         const entries = await res.json();
// //         console.log(res.json)
// //         console.error("An error has occurred while fetching diary entries.");
// //       }
// //     }

// //     fetchUsername();

// //   }, [token]);
// // }

// export function ProfileForm() {
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     console.log(token)
//     // if (!token) return

//     async function fetchUsername() {
//       const res = await app.get("/users/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.ok) {
//         const entries = await res.json();
//         console.log(res.json)
//         console.error("An error has occurred while fetching diary entries.");
//       }
//     }

//     fetchUsername();

//   }, [token]);

//   return (
//     <>
//       <div>
//         <Form method="post" className="register-form">
//           <div className="diary-form">
//             {/* <label htmlFor="profile-picture">Profile Picture:</label> */}
//             <img
//               src='components\Profile\defaultProfilePic\default-profile-pic.jpg'
//               alt="Default profile picture"
//               className="profile-picture-preview"
//             />
//             <input
//               type="file"
//               id="profile-picture"
//               accept="image/*"
//               className="profile-picture-input"
//               name="profile_pic"
//               // defaultValue={defaultProfilePic}
//             />
//             <h3><Link to="/profile" name="username">
//           John Michael
//         </Link></h3>
//         {/* <h4>{entry.username}'s diary entries</h4> */}
//           </div>

//         </Form>
//       </div>
//     </>
//   );
//   }

// import { useState, useEffect } from "react";
// import { app } from "../../lib/fetch-wrapper";
// import { Link } from "react-router-dom";

// export function ProfileForm() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     async function fetchUserData() {
//       const res = await app.get("/users/me");

//       if (!res.ok) {
//         console.error("An error has occurred!");
//         return;
//       }

//       const { data } = await res.json();
//       setUser(data[0]);
//     }

//     fetchUserData();
//   }, []);

//   return (
//     <>
//       <div>
//         <form method="post" className="register-form">
//           <div className="diary-form">
//             <img
//               src="components/Profile/defaultProfilePic/default-profile-pic.jpg"
//               alt="Default profile picture"
//               className="profile-picture-preview"
//             />
//             <input
//               type="file"
//               id="profile-picture"
//               accept="image/*"
//               className="profile-picture-input"
//               name="profile_pic"
//             />
//             <h3>
//               {user ? (
//                 <Link to="/profile" name="username">
//                   {user.username}
//                 </Link>
//               ) : (
//                 "Loading..."
//               )}
//             </h3>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// import { Form, redirect } from "react-router-dom";
// import { app } from "../../lib/fetch-wrapper";
// import { Link } from "react-router-dom";
// import React, { useEffect, useState } from "react";

// export function ProfileForm() {
//   const [username, setUsername] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     async function fetchUsername() {
//       const res = await app.get("/users/:id", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.ok) {
//         const user = await res.json();
//         setUsername(user.username);
//       } else {
//         console.error("An error has occurred while fetching the username.");
//       }
//     }

//     if (token) {
//       fetchUsername();
//     }
//   }, [token]);

//   return (
//     <>
//       <div>
//         <Form method="post" className="register-form">
//           <div className="diary-form">
//             <img
//               src='components\Profile\defaultProfilePic\default-profile-pic.jpg'
//               alt="Default profile picture"
//               className="profile-picture-preview"
//             />
//             <input
//               type="file"
//               id="profile-picture"
//               accept="image/*"
//               className="profile-picture-input"
//               name="profile_pic"
//             />
//             <h3>
//               <Link to="/profile" name="username">
//                 {username}
//               </Link>
//             </h3>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// }

// import { Form } from "react-router-dom";
// import { app } from "../../lib/fetch-wrapper";
// import React, { useEffect, useState } from "react";

// export function ProfileForm() {
//   const [username, setUsername] = useState("");
//   const token = localStorage.getItem("token");
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const response = await app.get("/users/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUsername(response.data.username);
//     };
//     fetchUserData();
//   }, [token]);

//   return (
//     <>
//       <div>
//         <Form method="post" className="register-form">
//           <div className="diary-form">
//             <img
//               src='components\Profile\defaultProfilePic\default-profile-pic.jpg'
//               alt="Default profile picture"
//               className="profile-picture-preview"
//             />
//             <input
//               type="file"
//               id="profile-picture"
//               accept="image/*"
//               className="profile-picture-input"
//               name="profile_pic"
//             />
//             <h3 name="username">{username}</h3>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// }

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
      console.log(response.data);
      // const user = response.data[0];

      // setUsername(user.username);
      if (response.ok) {
        const entries = await response.json();
        // console.log(entries);
        setUsername(entries.data.username);
        // entries = { data: { id: 55, username: 'username' }}
      }
    }
    fetchData();
  }, [token]);
  console.log(username);
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
          
          <Link to="/profile" name="username">
          <h3>{username}</h3>
          </Link>
          <Link to="/private" name="username">
          <h3>Private</h3>
          </Link>
        </div>
      </div>
    </>
  );
}
