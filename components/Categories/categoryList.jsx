// import React, { useEffect, useState } from "react";
// import { app } from "../../lib/fetch-wrapper";
// // import styles from "./Profile.module.css";
// import styles from "./category.module.css";
// import { Link } from "react-router-dom";

// export function CategoryList() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     async function fetchCategories() {
//       const token = localStorage.getItem("token");
//       const res = await app.get("/categories/:id", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.ok) {
//         const entries = await res.json();
//         setCategories(entries.data);
//       } else {
//         console.error("An error has occurred while fetching diary entries.");
//       }
//     }
//     fetchCategories();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmation = window.confirm(
//       "Are you sure you want to delete this diary entry?"
//     );
//     if (!confirmation) {
//       return;
//     }
//     const token = localStorage.getItem("token");
//     const res = await app.delete(`/categories/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (res.ok) {
//       const updatedCategories = categories.filter(
//         (category) => category.id !== id
//       );
//       setCategories(updatedCategories);
//     } else {
//       console.error("An error has occurred while deleting category.");
//     }
//   };

//   return (
//     <>
//       <div>
//         <h2>Category List</h2>
//         <ul>
//           {categories.map((category) => (
//             <li id={styles.space} key={category.id}>
//               {category.category_name}
//               {/* <button
//                 id={styles.right}
//                 onClick={() => handleDelete(category.id)}
//               >
//                 Delete
//               </button> */}
//               <Link to={category.id}>{category.category_name}
//           </Link>
//             </li>
//           ))}
          
//         </ul>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { app } from "../../lib/fetch-wrapper";
// import styles from "./Profile.module.css";
import styles from "./category.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const token = localStorage.getItem("token");
      const res = await app.get("/categories/:id", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const entries = await res.json();
        setCategories(entries.data);
      } else {
        console.error("An error has occurred while fetching diary entries.");
      }
    }
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this diary entry?"
    );
    if (!confirmation) {
      return;
    }
    const token = localStorage.getItem("token");
    const res = await app.delete(`/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const updatedCategories = categories.filter(
        (category) => category.id !== id
      );
      setCategories(updatedCategories);
    } else {
      window.alert("cannot be deleted, category is in use");
    }
  };

  return (
    <>
      <div>
        <h2>category list</h2>
        <ul>
          {categories.map((category) => (
            <li id={styles.space} key={category.id}>
              {/* {category.category_name} */}
              
              <button
                id={styles.right}
              >
                <Link to={category.category_name}>{category.category_name}</Link>
               <FaTrashAlt
                title="delete"
                style={{ float: "right" }}
                onClick={() => handleDelete(category.id)}
              />
              </button>
            </li>
          ))}
          
        </ul>
      </div>
    </>
  );
}
