import React, { useEffect, useState } from "react";
import { app } from "../../lib/fetch-wrapper";
import { Link } from "react-router-dom";
// import styles from './diary.module.css';
import styles from "../Diary/diary.module.css";
import Container from "react-bootstrap/Container";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

const dateOptions = { month: "short", day: "numeric", year: "numeric" };

export function PrivateList() {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchDiaryEntries() {
      const res = await app.get("/pages/private", {
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
  }, [token]);

  return (
    <>
    <h3>private diary</h3>
      <div>
        
        {diaryEntries.map((entry) => (
          <div id={styles.dv} key={entry.id} className="diary-entry">
            <h2 id={styles.dash}>{entry.username}'s diary entries </h2>
            <h3 id={styles.centerText}>{entry.title}</h3>
            {entry.private && (
              <h5 id={styles.private}>
                <RiGitRepositoryPrivateFill
                  style={{ verticalAlign: "middle" }}
                  title="in private"
                />
              </h5>
            )}
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
