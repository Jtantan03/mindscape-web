// import React from "react";
// import styles from './diary.module.css'
// import { Form, redirect } from "react-router-dom";
// import { app } from "../../lib/fetch-wrapper";
// import { Link } from "react-router-dom";

// export async function action({ request }) {
//   // console.log(action);
//   const data = Object.fromEntries(await request.formData());
//   const res = await app.post("/pages", data);

//   if (!res.ok) {
//     console.error("An error has occurred!");
//     return null;
//   }
//   return redirect("/dashboard");
// }

// // <DiaryForm redirectRoute="/profile" />
// export function DiaryForm({ redirectRoute }) {
//   return (
//     <>

//       <div id={styles.dv}>
//       <div  className="grid-container"></div>
//       <div className="diary-app">
//         <h1>Dear Diary...</h1>
//       </div>
//         <Form method="post" className="register-form">
//           <div className="diary-form">
//             <input id={styles.dv}
//               placeholder="Title..."
//               className="diary-input"
//               name="title"
//             />
//             <input id={styles.dv} type="date" className="diary-date-input" name="date" />
//           </div>
//           <textarea id={styles.dv}
//             rows="2"
//             className="diary-textarea"
//             placeholder="Diary..."
//             name="story"
//           ></textarea>
//           <br></br>
//           <button id={styles.marginButton} type="submit" style={{ color: "white" }}>
//             Add Item To Diary
//           </button>
//           <button id={styles.marginButton} className="diary-button">
//             <Link to={redirectRoute} style={{ color: "white" }}>
//               cancel
//             </Link>
//           </button>
//         </Form>
//       </div>
//     </>
//   );
// }

// import React, { useState } from "react";
// import "./Diary.css";
// import { Form, redirect } from "react-router-dom";
// import { app } from "../../lib/fetch-wrapper";
// import { Link } from "react-router-dom";
// function ToggleSwitch(props) {
//   const { isChecked, handleToggle } = props;

//   return (
//     <label className="toggle-switch">
//       <input type="checkbox" checked={isChecked} onChange={handleToggle} />
//       <span className="slider round"></span>
//     </label>
//   );
// }

// export async function action({ request }) {
//   console.log(action);
//   const data = Object.fromEntries(await request.formData());
//   const res = await app.post("/pages", data);

//   if (!res.ok) {
//     console.error("An error has occurred!");
//     return null;
//   }
//   return redirect("/dashboard");
// }

// export function DiaryForm() {
//   const [isChecked, setIsChecked] = useState(false);

//   const handleToggle = () => {
//     setIsChecked(!isChecked); // toggle the isChecked state variable
//   };

//   return (
//     <>
//       <div id="dv" className="grid-container"></div>
//       <div className="diary-app">
//         <h1>Dear Diary...</h1>
//       </div>
//       <div>
//         <Form method="post" className="register-form">
//           <div className="diary-form">
//             <input placeholder="Title..." className="diary-input" name="title" />
//             <input type="date" className="diary-date-input" name="date" />
//           </div>
//           <textarea rows="2" className="diary-textarea" placeholder="Diary..." name="story"></textarea>
//           <br></br>
//           <button type="submit" className="diary-button">
//             Add Item To Diary
//           </button>
//           <div className="toggle-switch-container"><label name="private">Private: {isChecked ? "True" : "False"}</label>
//             <ToggleSwitch isChecked={isChecked} handleToggle={handleToggle} />

//           </div>
//           <button className="diary-button">
//             <Link to="/dashboard">cancel</Link>
//           </button>
//         </Form>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import styles from "./diary.module.css";
import { Form, redirect, useNavigate } from "react-router-dom";
import { app } from "../../lib/fetch-wrapper";
import { Link } from "react-router-dom";

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  const res = await app.post("/pages", data);

  if (!res.ok) {
    console.error("An error has occurred!");
    return null;
  }
  return redirect("/dashboard");
}

export function DiaryForm({ redirectRoute }) {
  const navigate = useNavigate();
  const [isPrivate, setIsPrivate] = useState(false);

  const handlePrivateChange = (event) => {
    setIsPrivate(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.target));

    console.log(data);
    const res = await app.post("/pages", data);

    if (!res.ok) {
      console.error("An error has occurred!");
      return;
    }

    // Redirect to the specified route
    navigate(redirectRoute);
  };

  return (
    <>
      <div id={styles.dv}>
        <div className="grid-container"></div>
        <div className="diary-app">
          <h1>Dear Diary...</h1>
        </div>
        <Form method="post" className="register-form" onSubmit={handleSubmit}>
          <div className="diary-form">
            <a>category</a>
            <select name="categoryId">
              <option value="20">as doctor</option>
              <option value="21">as pilot</option>
              <option value="22">as firemen</option>
            </select>
            <input
              placeholder="Title..."
              className="diary-input"
              name="title"
            />
            <input type="date" className="diary-date-input" name="date" />
          </div>
          <textarea
            rows="2"
            className="diary-textarea"
            placeholder="Diary..."
            name="story"
          ></textarea>
          <label>
            <input
              type="checkbox"
              name="private"
              checked={isPrivate}
              onChange={handlePrivateChange}
            />
            Private
          </label>
          <br></br>
          <button
            id={styles.marginButton}
            type="submit"
            style={{ color: "white" }}
          >
            Add Item To Diary
          </button>
          <button id={styles.marginButton} className="diary-button">
            <Link to={redirectRoute} style={{ color: "white" }}>
              Cancel
            </Link>
          </button>
        </Form>
      </div>
    </>
  );
}
