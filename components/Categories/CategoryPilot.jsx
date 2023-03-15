import React, { useEffect, useState } from "react";
import { app } from "../../lib/fetch-wrapper";
import styles from "./Profile.module.css";

const dateOptions = { month: "short", day: "numeric", year: "numeric" };

export function ProfileDiaryList() {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editedEntry, setEditedEntry] = useState({
    title: "",
    story: "",
    date: "",
    private: false, // set default value to false
  });

  useEffect(() => {
    async function fetchDiaryEntries() {
      const token = localStorage.getItem("token");
      const res = await app.get("/pages/category/pilot", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const entries = await res.json();
        // sort entries by date in descending order
        entries.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setDiaryEntries(entries.data);
      } else {
        console.error("An error has occurred while fetching diary entries.");
      }
    }

    fetchDiaryEntries();
  }, []);

  async function handleDelete(id) {
    const confirmation = window.confirm(
      "Are you sure you want to delete this diary entry?"
    );
    if (!confirmation) {
      return;
    }
    const token = localStorage.getItem("token");
    const res = await app.delete(`/pages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const updatedEntries = diaryEntries.filter((entry) => entry.id !== id);
      setDiaryEntries(updatedEntries);
    } else {
      console.error(
        `An error has occurred while deleting the entry with ID ${id}.`
      );
    }
  }

  async function handleEdit(diaryEdit) {
    // find the entry to edit by ID

    setEditedEntry({
      title: diaryEdit.title,
      story: diaryEdit.story,
      date: diaryEdit.date.substr(0, 10),
      private: diaryEdit.private, // add private field
    });
    setSelectedEntry(diaryEdit);
    setShowEditModal(true);
  }

  const handleChange = (event) => {
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value; // handle checkbox
    let name = event.target.name;

    setEditedEntry((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await app.put(`/pages/${selectedEntry.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: {
        private: editedEntry.private == null ? false : true,
        ...editedEntry,
      },
    });
    console.log(res);
    if (res.ok) {
      // update the entry in the diaryEntries state
      const updatedEntries = diaryEntries.map((entry) =>
        entry.id === selectedEntry.id ? { ...entry, ...editedEntry } : entry
      );
      setDiaryEntries(updatedEntries);
      setShowEditModal(false);
    } else {
      console.error(
        `An error has occurred while updating the entry with ID ${selectedEntry.id}.`
      );
    }
  }

  async function cancelEdit() {
    setShowEditModal(false);
    setEditedEntry({ title: "", story: "", date: "" });
    setSelectedEntry(null);
    const confirmation = window.confirm(
      "Changes you've made will not be saved."
    );
    if (!confirmation) {
      return;
    }
  }

  return (
    <div className="diary-list">
      {diaryEntries.map((entry) => (
        <div id={styles.dv} key={entry.id} className="diary-entry">
          <h2 id={styles.dash}>{entry.username}'s diary entries </h2>
          <h3 id={styles.centerText}>{entry.title}</h3>
          {entry.private ? (
            <p id={styles.centerText}>
              {entry.story} <br></br>This diary entry is private.
            </p>
          ) : (
            <p id={styles.centerText}>{entry.story}</p>
          )}
          <p>{new Date(entry.date).toLocaleDateString("en-US", dateOptions)}</p>
          <p>Written by: {entry.username}</p>
          {/* <h2 id={styles.dash}>{entry.username}'s diary entries</h2>
          <h3>{entry.title}</h3>
          <p>{entry.story}</p>
          <p>{new Date(entry.date).toLocaleDateString("en-US", dateOptions)}</p> */}
          <button
            id={styles.button}
            style={{ color: "white" }}
            onClick={() => handleDelete(entry.id)}
          >
            Delete
          </button>
          <button
            id={styles.button}
            style={{ color: "white" }}
            onClick={() => handleEdit(entry)}
          >
            Edit
          </button>
        </div>
      ))}
      {showEditModal && (
        <div>
          <section id={styles.modal}>
            <h2>Edit Entry</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={editedEntry.title}
                onChange={handleChange}
              />
              <label htmlFor="story">Story</label>
              <textarea
                id="story"
                name="story"
                value={editedEntry.story}
                onChange={handleChange}
              />
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={editedEntry.date}
                onChange={handleChange}
              />
              <label>private</label>
              <input
                id={styles.checkBox}
                type="checkbox"
                checked={editedEntry.private}
                // id="private"
                name="private"
                value={editedEntry.private}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={handleSubmit}
                style={{ color: "white" }}
              >
                Save
              </button>
              <button
                type="button"
                style={{ color: "white" }}
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
