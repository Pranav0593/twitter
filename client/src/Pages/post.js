import React, {useContext, useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios"
import "../App.css"
import { authContext } from '../helpers/authContext'
function Post() {
    let {id} = useParams();
    const [postObject, setpostObject] = useState({});
    const [Comments, setComments] = useState([]);
    const [newComment, setnewComment] = useState(""); // creating a state so that the value that we input in the comments input can be used later
    const {authState} = useContext(authContext)
    useEffect(() => {
        axios.get(`http://localhost:8000/posts/byid/${id}`).then((response)=>{
            setpostObject(response.data)
        });
    })
    useEffect(() => {
      axios.get(`http://localhost:8000/comments/${id}`)
          .then((response) => {
              setComments(response.data);
          })
          .catch((error) => {
              console.error("Error fetching comments:", error);
          });
  }, []); // this dependency array is called so that a re render is only triggered on the change of an ID, if we dont add this the server makes a load of requests continuously
  const addComment = () => {
    axios
      .post("http://localhost:8000/comments", {
        commentBody: newComment,
        postId: id,
      }, {
        headers:{
          accessToken: localStorage.getItem("accessToken"),
        }
      }) // getting the access to the headers when the post request is made, the backend can be viewed in comments.js and the middleware used is authMiddleware.js
      .then((response) => {
        if(response.data.error) alert(response.data.error);
        else{
          const commentToAdd = {
            commentBody: newComment,
            username : response.data.username
          }
          setComments([...Comments, commentToAdd]); // Add the new comment to the list
          setnewComment(""); // Clear the input field after adding the comment
        }
        // Optionally, you can refresh the comments list here
        
      });
  };
  
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className='addCommentContainer'>
            <input type="text" placeholder='Add a comment...' autoComplete='off' value={newComment} onChange={(event)=>{setnewComment(event.target.value)}}/> {/*This is how to get the value directly from the input and setting it to a state*/}
            <button onClick={addComment}>Post Comment</button> 
        </div>
      <div className='listOfComments'>
          {Comments.map((comment, key)=>{
            return <div key={key} className='comment'>{comment.commentBody}
            <label>Username: {comment.username}</label> 
            </div>
          })}
      </div>
      </div>
    </div>
  )
}

export default Post
