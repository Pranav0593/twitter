import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import "../App.css"
import * as Yup from "yup"
import axios from "axios";
function Registration() {
    const initialValues = {
        username:"",
        password:"",
    };
    const validationSchema = Yup.object().shape({
        username:  Yup.string().min(3).max(15).matches(/^@/, "Username must start with @").required("*required"),
        password: Yup.string().min(4).max(20).required("you must enter a password")
    })
    const handleSubmit=(data) =>{
        axios.post("http://localhost:8000/auth", data).then((response)=>{
          console.log(response);
        })
        window.location.href = "/login";
    }
  return (
    <div className='createPostPage'>
      <h1 color='white'>Register</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form className='formContainer'>
            <label>Username: </label>
                  <ErrorMessage name="username" component="span"/>
                  <Field 
                  id="inputCreatePost" 
                  name="username" 
                  placeholder="Enter the username"/>
            <label>Password: </label>
                  <ErrorMessage name="password" component="span"/>
                  <Field 
                  id="inputCreatePost" 
                  name="password" 
                  placeholder="Enter the password"
                  />
            <button type='submit'>Create User</button>
          </Form>
        </Formik>
    </div>
  )
}

export default Registration
