import { Form, redirect } from "react-router-dom";
import { app } from "../../lib/fetch-wrapper";
import React from "react";
import Button from "react-bootstrap/Button";
import styles from "./category.module.css";

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  const res = await app.post("/categories", data);


  if (!res.ok) {
    console.error("An error has occurred!");
    return null;
  }
  return redirect("/dashboard");
}

export function CategoryForm() {
  return (
    <>
      <div id={styles.topmargin} style={{ display: "flex", alignItems: "center" }}>
        <Form method="post">
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              placeholder="category name"
              name="name"
              id={styles.borderline}
              style={{ width: "calc(100% - 50px)" }}
            />
            <button
              id={styles.borderline}
              variant="primary"
              type="submit"
              style={{ color: "white" }}
            >
              add
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

// import { Form, redirect } from "react-router-dom";
// import { app } from "../../lib/fetch-wrapper";
// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// // import "./CategoryForm.css"; // import CSS file for styling

// export async function action({ request }) {
//   console.log(action);
//   const data = Object.fromEntries(await request.formData());
//   const res = await app.post("/categories", data);
//   console.log("post")
//   console.log(data)

//   if (!res.ok) {
//     // console.error("An error has occurred!");
//     return null;
//   }
//   return redirect("/dashboard");
// }

// export function CategoryForm() {
//   const [showInput, setShowInput] = useState(false);

//   const handleAddClick = () => {
//     setShowInput(true);
//   }

//   const handleCloseClick = () => {
//     setShowInput(false);
//   }

//   return (
//     <>
//     <h4>Categories</h4>
//       <div className="category-form-container">
//         {!showInput && // render "+" button only if showInput state is false
//           <Button className="add-button" variant="primary" onClick={handleAddClick}>
//             +
//           </Button>
//         }
//         {showInput && // render input and "x" button only if showInput state is true
//           <Form className="category-form" method="post" >
//             <input className="category-input" placeholder="category name" name="name" />
//             <Button className="submit-button" variant="primary" type="submit">
//               add
//             </Button>
//             <Button className="close-button" variant="secondary" onClick={handleCloseClick}>
//               x
//             </Button>
//           </Form>
//         }
//       </div>
//     </>
//   );
// }

// import { Form, redirect } from "react-router-dom";
// import { app } from "../../lib/fetch-wrapper";
// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";

// export function CategoryForm() {
//   const [showInput, setShowInput] = useState(false);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     // Retrieve latest category data after successful submission
//     const fetchData = async () => {
//       const res = await app.get("/categories/me",{
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }

//       });
//       const data = await res.json();
//       setCategories(data);
//     };

//     fetchData();
//   }, []);

//   const handleAddClick = () => {
//     setShowInput(true);
//   };

//   const handleCloseClick = () => {
//     setShowInput(false);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.target);
//     const res = await app.post("/categories", data);
//     console.log(data);
//     console.log(event);

//     if (res.ok) {
//       // Retrieve latest category data after successful submission
//       const res = await app.get("/categories/me");
//       const data = await res.json();
//       console.log(data)
//       setCategories(data);

//       setShowInput(false);
//     }
//   };

//   return (
//     <>
//       <h4>Categories</h4>
//       <div className="category-form-container">
//         {!showInput && (
//           <Button className="add-button" variant="primary" onClick={handleAddClick}>
//             +
//           </Button>
//         )}
//         {showInput && (
//           <Form className="category-form" onSubmit={handleSubmit}>
//             <input className="category-input" placeholder="category name" name="name" />
//             <Button className="submit-button" variant="primary" type="submit">
//               add
//             </Button>
//             <Button className="close-button" variant="secondary" onClick={handleCloseClick}>
//               x
//             </Button>
//           </Form>
//         )}
//         {categories.length > 0 && (
//           <ul>
//             {categories.map((category) => (
//               <li key={category.id}>{category.name}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// }
