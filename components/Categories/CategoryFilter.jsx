import React, { useEffect, useState } from "react";
import { app } from "../../lib/fetch-wrapper";
// import styles from "./Profile.module.css";
import styles from "./category.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";




export function CategoryFilter() {
  const { id } = useParams()
  const [categories, setCategories] = useState([]);
  console.log(id)
  useEffect(() => {
    async function fetchCategories() {
      const token = localStorage.getItem("token");
      const res = await app.get("/pages/categories/:id", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        console.log(data)
        const entries = await res.json();
        setCategories(entries.data);
      } else {
        console.error("An error has occurred while fetching diary entries.");
      }
    }
    fetchCategories();
  }, []);


  return (
    <>
      <div>
        <h2>Category Filter</h2>
        {categories.map((entry) =>(
          <Link to={entry.id}>{entry.category_name}
          </Link>
        )
        )}
      </div>
    </>
  );
}
