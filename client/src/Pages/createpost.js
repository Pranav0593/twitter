import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import "../App.css"
import * as Yup from "yup"
import axios from "axios";

// remember the formik scheme to create the form 
// yup is used for form validation
function Create() {
    const initialValues = {
        title: "",
        postText: "",
        username: "",
    };
    const onSubmit = (data) =>{
        axios.post("http://localhost:8000/posts", data).then((response)=>{

        })
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("*required"),
        postText: Yup.string().min(10).max(255).required("*required"),
        username:  Yup.string().min(3).max(15).matches(/^@/, "Username must start with @").required("*required"),
    })
  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} 
                onSubmit={onSubmit} 
                validationSchema={validationSchema}> 
            <Form className='formContainer'>
                <label>Title: </label>
                <ErrorMessage name="title" component="span"/>
                <Field 
                id="inputCreatePost" 
                name="title" 
                placeholder="{Ex: Title}"/>

                <label>Content: </label>
                <ErrorMessage name="postText" component="span"/>
                <Field 
                id="inputCreatePost" 
                name="postText" 
                placeholder="{Ex: Title}"/>
            
                <label>Username: </label>
                <ErrorMessage name="username" component="span"/>
                <Field 
                id="inputCreatePost" 
                name="username" 
                placeholder="{Ex: Title}"/>

                <button type="submit">Submit</button>
            </Form>
        </Formik> 
    </div>
  )
}

export default Create
