import React from 'react'
import '../App.css'
import axios from 'axios'
import { useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {BrowserRouter as Router, Route, Switch, Routes, BrowserRouter, Link} from 'react-router-dom'
function Home() {
    const [listOfPosts, setlistOfPosts] = useState([]); 
    let navigate = useNavigate();
    const handleNavigation = (id) => {
        navigate(`/post/${id}`)
    }
    useEffect(()=>{ // re render logic
        axios.get("http://localhost:8000/posts").then((response)=>{ // axios.get() returns a promise
            setlistOfPosts(response.data)
        })
    }, []) // in the end pass the list of dependencies that you want to pass
    return (
    <div>
        {listOfPosts.map((value, key)=>{ // map the data of the element to the index to display the data in the frontend
            return ( 
            <div className='post' onClick={()=>{handleNavigation(value.id)}}>
                <div className='title'>{value.title}</div>
                <div className='body'>
                    {value.postText}
                </div>
                <div className='footer'>{value.username}</div>
            </div>
            );
        })}
    </div>
    )
}

export default Home
