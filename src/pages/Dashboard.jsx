import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import React from "react";
import { app } from "../../lib/fetch-wrapper";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { redirect } from "react-router-dom";
import NavLogin from "../../components/Nav_logged/Navbar";
import "./Dashboard.css";
import { DiaryForm } from "../../components/Diary/DiaryForm";
import { Outlet, Link } from "react-router-dom";
import { AddDiary } from "../../components/Diary/addDiary";
import { ProfileForm } from "../../components/Profile/ProfileForm";
import { DiaryList } from "../../components/Diary/DiaryList";

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  console.log(data);
  const res = await app.post("/users", data);

  if (!res.ok) {
    console.error("An error has occurred!");
    return null;
  }

  return redirect("/dashboard");
}

export function Dashboard() {
  const [diaryId, setDiaryId] = useState(Date.now());

  useEffect(() => {
    // Refresh dashboard page whenever a new diary entry is added
    console.log("Refreshing dashboard...");
  }, [diaryId]);

  return (
    <>
      <Row>
        <Col>
          <NavLogin />
        </Col>
      </Row>
      <Container>
        <Row>
          <Col>
            <ProfileForm />
          </Col>

          <Col xs={9}>
            <Outlet />
            <DiaryList />
          </Col>
        </Row>
      </Container>
    </>
  );
}