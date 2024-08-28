import './App.css';
import {BrowserRouter as Router, Route, Switch, Routes, BrowserRouter, Link} from 'react-router-dom'
import Home from "./Pages/home";
import Create from "./Pages/createpost"
import Post from "./Pages/post"
import Registration from './Pages/registration';
import Login from './Pages/login';
import { authContext } from './helpers/authContext';
import {useState, useEffect} from "react";
import axios from "axios";
function App() {
  const [authState, setauthState] = useState({
    username:"", 
    id: 0,
    status:false
  });
  useEffect(()=>{
    axios.get("http://localhost:8000/auth/auth",{
      headers:{
        accessToken:localStorage.getItem("accessToken")
      }
    }).then((response)=>{
      if(response.data.error){
        setauthState({...authState, status:false}); // grabbing the authstate and setting the status to false (conditional change in the hook)
      }
      else{
        setauthState({
          username:response.data.username,
          id: response.data.username,
          status:true
        });
      }
    })
  },[]);
  const logout = ()=>{
    localStorage.removeItem("accessToken");
    setauthState({
      username:"",
      id:0,
      status:false
    });
  }
  return(
    <div className='App'>
      <authContext.Provider value={{authState, setauthState}}>
      <BrowserRouter>
      <div className="navbar">
          <Link to="/"> Home Page</Link>
          <Link to="/createpost"> Create A Post</Link>
          {
            !authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Register</Link>
              </>
            ):(
              <>
                <Link to="/" id="profileLink">{authState.username}</Link>
                <button id='logout' onClick={logout}>Log Out</button>
              </>
            )
          }
        </div>
        <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path="/createpost" element = {<Create/>}/>
          <Route path="/post/:id" element={<Post/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
        </Routes>
      </BrowserRouter>
      </authContext.Provider>
    </div>
  );
}
// setup cors to accept request
export default App;
