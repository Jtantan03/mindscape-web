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
      <div
        id={styles.topmargin}
        style={{ display: "flex", alignItems: "center" }}
      >
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
              className={styles.Add}
              variant="primary"
              type="submit"
              style={{ color: "white" }}
            >
              Add
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
