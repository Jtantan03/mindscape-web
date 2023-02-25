import "./Diary.css";
import { Link } from "react-router-dom";

export function AddDiary() {
  return (
    <>
      <div>
        <Link to="diary">
          <h1>Add Diary</h1>
        </Link>
      </div>
    </>
  );
}
