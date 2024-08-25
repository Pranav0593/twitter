import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios"
import "../App.css"
function Post() {
    let {id} = useParams();
    const [postObject, setpostObject] = useState({});
    const [Comments, setComments] = useState([]);
    const [newComment, setnewComment] = useState(""); // creating a state so that the value that we input in the comments input can be used later
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
      })
      .then((response) => {
        // Optionally, you can refresh the comments list here
        setComments([...Comments, response.data]); // Add the new comment to the list
        setnewComment(""); // Clear the input field after adding the comment
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
            return <div key={key} className='comment'>{comment.commentBody}</div>
          })}
      </div>
      </div>
    </div>
  )
}

export default Post
