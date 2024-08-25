import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import "../App.css"
import * as Yup from "yup"
import axios from "axios";
function Login() {
    const initialValues = {
        username:"",
        password:"",
    };
    const validationSchema = Yup.object().shape({
        username:  Yup.string().min(3).max(15).matches(/^@/, "Username must start with @").required("*required"),
        password: Yup.string().required("you must enter a password")
    })
    const handleSubmit = (data) => {
      axios.post("http://localhost:8000/auth/login", data)
        .then((response) => {
          if (response.status === 200) {
            console.log("Successful login");
            window.location.href = "/"; // Redirect to a different page
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              alert("Error Code 401: Wrong Login Credentials Please Try Again")
              // Display an error message to the user
            } else {
              alert("An unexpected error occurred.");
            }
          } else if (error.request) {
            alert("No response from the server.");
          } else {
            alert("Error", error.message);
          }
        });
    };
    
  return (
    <div className='createPostPage'>
      <h1>Login</h1>
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

export default Login
