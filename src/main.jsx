import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import { SignUp, action as SignUpAction } from "./pages/SignUp";
import {
  LogIn,
  action as LogInAction,
  loader as LoginLoader,
} from "./pages/LogIn";
import { Dashboard } from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  DiaryForm,
  action as DiaryAction,
} from "../components/Diary/DiaryForm";
import { AddDiary } from "../components/Diary/addDiary";
import { Profile } from "./pages/Profile";
import {
  CategoryForm,
  action as CategoryAction,
} from "../components/Categories/CategoryForm";
import { Private } from "./pages/private";
import { PrivateList } from "../components/private/privateList";
// import { Categories } from "./pages/Categories";
// import { CategoryFiremen } from "../components/Categories/CategoryFiremen";


// import { CategoryFilter, action as CategoryFilterAction } from "../components/Categories/categoryList";

// import { action as addDiaryAction } from '../components/Diary/addDiary';

const router = createBrowserRouter(
  createRoutesFromElements([
    <>
      <Route path="/" element={<App />} loader={LoginLoader}>
        <Route
          path="/sign-up"
          element={<SignUp />}
          action={SignUpAction}
          loader={LoginLoader}
        />
        <Route index element={<LogIn />} loader={LoginLoader} />
      </Route>
      ,
      <Route path="/dashboard" element={<Dashboard />} action={CategoryAction} >

        <Route index element={<AddDiary />} />
        <Route
          path="diary"
          element={<DiaryForm redirectRoute={"/dashboard"} />}
          action={DiaryAction}
        />
      </Route>
      <Route path="/profile" element={<Profile />} action={CategoryAction}>
        <Route index element={<AddDiary />} />
        <Route
          path="diary"
          element={<DiaryForm redirectRoute={"/profile"} />}
          action={DiaryAction}
        />
      </Route>
      ,
      <Route path="/private" element={<Private />} action={CategoryAction}>
        <Route  index element={<PrivateList />} />
      </Route>
      ,
      {/* <Route path="category/" element={<Categories />}>
        <Route index element={<CategoryFiremen />}></Route>

      </Route> */}
    </>,
  ])
);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>,
);
