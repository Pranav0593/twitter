import './App.css';
import {BrowserRouter as Router, Route, Switch, Routes, BrowserRouter, Link} from 'react-router-dom'
import Home from "./Pages/home";
import Create from "./Pages/createpost"
import Post from "./Pages/post"
import Registration from './Pages/registration';
import Login from './Pages/login';
import { authContext } from './helpers/authContext';
import {useState, useEffect} from "react";
function App() {
  const [authState, setauthState] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem("accessToken")){
      setauthState(true);
    }
  },[]);
  return(
    <div className='App'>
      <authContext.Provider value={{authState, setauthState}}>
      <BrowserRouter>
      <div className="navbar">
          <Link to="/"> Home Page</Link>
          <Link to="/createpost"> Create A Post</Link>
          {
            !authState && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Register</Link>
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
