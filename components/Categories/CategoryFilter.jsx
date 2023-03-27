import React, { useEffect, useState } from "react";
import { app } from "../../lib/fetch-wrapper";
import styles from "./category.module.css";
import { Link, useParams } from "react-router-dom";

const dateOptions = { month: "short", day: "numeric", year: "numeric" };

export function CategoryFilter() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const token = localStorage.getItem("token");
      const res = await app.get(`/pages/category/${id}`, {
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
  }, [id]);

  return (
    <>
      <div>
        {categories.map((entry) => (
          <div id={styles.dv} key={entry.id} className="diary-entry">
            <h2 id={styles.dash}>
              {entry.username}'s diary entries{" "}
              <h3 id={styles.pos}>{entry.category_name}</h3>{" "}
            </h2>
            <h3 id={styles.centerText}>{entry.title}</h3>
            <p id={styles.centerText}>{entry.story}</p>
            <p>
              {new Date(entry.date).toLocaleDateString("en-US", dateOptions)}
            </p>
            <p>written by: {entry.username}</p>
          </div>
        ))}
      </div>
    </>
  );
}
