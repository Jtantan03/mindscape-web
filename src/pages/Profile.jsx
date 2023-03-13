import { useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
import React from "react";
import { app } from "../../lib/fetch-wrapper";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { redirect } from "react-router-dom";
import NavLogin from "../../components/Nav_logged/Navbar";
import "./Dashboard.css";
import { Outlet, Link } from "react-router-dom";
import { ProfileForm } from "../../components/Profile/ProfileForm";
import { ProfileDiaryList } from "../../components/Profile/ProfileDiaryList";
import { CategoryForm } from "../../components/Categories/CategoryForm";
import { CategoryList } from "../../components/Categories/categoryList";
// import {CategoryForm } from "../components/Categories/CategoryForm"

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  console.log(data);
  const res = await app.post("/users", data);

  if (!res.ok) {
    console.error("An error has occurred!");
    return null;
  }

  return redirect("/profile");
}

export function Profile() {
  const [diaryId, setDiaryId] = useState(Date.now());

  useEffect(() => {
    // Refresh dashboard page whenever a new diary entry is added
    console.log("Refreshing dashboard...");
  }, [diaryId]);

  return (
    <>
      <Row id="topborder">
        <Col>
          <NavLogin />
        </Col>
      </Row>
      <Container>
        <Row>
          <Col xs={12} md={3} id="rightborder">
            <ProfileForm />
          </Col>

          <Col md={6} xs={12} id="rightborder">
            <Outlet />
            <ProfileDiaryList />
          </Col>

          <Col md={3} xs={12}>
            <CategoryForm />
            <CategoryList />
          </Col>
        </Row>
      </Container>
    </>
  );
}
