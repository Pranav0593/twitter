const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const db = require("./models")

// middlewares
app.use(express.json()) // to use the data that is parsed as json
app.use(cors()) // accepts the API request for the server running on the computer
// Routers
const PostRouter = require("./routes/posts")
app.use("/posts",PostRouter)
const CommentsRouter = require("./routes/comments")
app.use("/comments",CommentsRouter)
const UserRouter = require("./routes/users")
app.use("/auth",UserRouter)
const LikesRouter = require("./routes/like")
app.use("/like",LikesRouter)
db.sequelize.sync().then(()=>{ // Goes through the models folder and creates a table if it doesn't exist in the 
    app.listen(PORT, ()=>{
        console.log(`Server running on PORT ${PORT}....`)
    })
})
