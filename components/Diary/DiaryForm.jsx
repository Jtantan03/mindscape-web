import React, { useEffect, useState } from "react";
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
  const [categories, setCategories] = useState([]);

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
              {categories.map((category) => (
                <option value={category.id}>{category.category_name}</option>
              ))}
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
            private
            <input
              id={styles.privatebox}
              type="checkbox"
              name="private"
              checked={isPrivate}
              onChange={handlePrivateChange}
            />
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
