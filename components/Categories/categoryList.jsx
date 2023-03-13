import React, { useEffect, useState } from "react";
import { app } from "../../lib/fetch-wrapper";
// import styles from "./Profile.module.css";

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
    console.log("message")
  }, []);

  return (
    <div>
      <h2>Category List</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.category_name}</li>
        ))}
      </ul>
    </div>
  );
}
