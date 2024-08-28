const express = require("express");
const router = express.Router();
const {Comments} = require("../models");
const {validateToken} = require("../middlewares/authMiddleware")
router.get("/:postId",async(req, res)=>{
    const postId = req.params.postId
    const comments = await Comments.findAll({where: {PostId:postId}}) // this will search through the database searching through the primary key
    res.json(comments)
})
router.post("/",validateToken,async(req,res)=>{
    const comment = req.body;
    const username = req.user.username
    comment.username = username
    await Comments.create(comment);
    return res.json(comment);
})
router.delete("/:commentId", validateToken, async(req, res)=>{
    const commentId = req.params.commentId;
    Comments.destroy({
        where:{
            id:commentId,
        },
    });
});

module.exports = router