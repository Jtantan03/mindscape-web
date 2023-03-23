import './diary.module.css'
import { Link } from "react-router-dom";

export function AddDiary() {
  return (
    <>
      <div>
        <Link to="diary">
          <h1>add diary</h1>
        </Link>
      </div>
    </>
  );
}
