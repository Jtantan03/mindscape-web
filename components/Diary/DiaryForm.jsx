import React from "react"
import './Diary.css'
import { Form, redirect } from "react-router-dom";
import { app } from "../../lib/fetch-wrapper";
import { Link } from "react-router-dom";

export async function action({ request }) {
    console.log(action)
    const data = Object.fromEntries(await request.formData());
    const res = await app.post("/pages", data);
  
    if (!res.ok) {
      console.error("An error has occurred!");
      return null;
    }
    return redirect("/dashboard");
  }

export function DiaryForm (){
    return (
        <> 
        <div id="dv" className='grid-container'></div>
            <div className='diary-app'>
              <h1>Dear Diary...</h1>
            </div>
          <div>
            <Form  method="post" className="register-form">
                <div className="diary-form">
                    <input  placeholder="Title..." className="diary-input" name="title"/>
                    <input  type="date" className="diary-date-input" name="date"/>
                </div>
                <textarea  rows="2" className="diary-textarea" placeholder="Diary..." name="story">
                </textarea><br></br>
                <button type="submit" className="diary-button">Add Item To Diary</button>  
                <button className="diary-button"><Link to="/dashboard"> 
          cancel
        </Link></button>
            </Form>
        </div>
        </>


    )

}


