import React, { useEffect, useState } from "react";
import { app } from "../../lib/fetch-wrapper";
import styles from "./category.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

export function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);

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
        <h2>
          category list <AiFillEdit onClick={() => setEditMode(!editMode)} />
        </h2>
        <ul>
          {categories.map((category) => (
            <li id={styles.space} key={category.id}>
              <button id={styles.right}>
                <Link id={styles.linkD} to={`/category/${category.id}`}>
                  {category.category_name}
                </Link>
                {editMode ? (
                  <FaTrashAlt
                    title="delete"
                    style={{ float: "right" }}
                    onClick={() => handleDelete(category.id)}
                  />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
