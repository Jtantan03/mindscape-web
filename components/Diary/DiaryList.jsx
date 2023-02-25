import React, { useEffect, useState } from "react";
import "./Diary.css";
import { app } from "../../lib/fetch-wrapper";
import { Link } from "react-router-dom";

export function DiaryList() {
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    async function fetchDiaryEntries() {
      const token = localStorage.getItem("token");
      const res = await app.get("/pages", {
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

  return (
    <div className="diary-list">
      {diaryEntries.map((entry) => (
        <div key={entry.id} className="diary-entry">
          {/* <Link to={`/pages/${entry.id}`}> */}
          <h2>{entry.title}</h2>
          <p>{entry.story}</p>
          <p>{entry.date}</p>
          {/* </Link> */}
        </div>
      ))}
    </div>
  );
}
