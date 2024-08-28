const express = require("express");
const router = express.Router();
const {Likes} = require("../models");
const {validateToken} = require("../middlewares/authMiddleware")
router.post("/", validateToken,async(req, res)=>{
    const {PostId} = req.body;
    const userId = req.user.id;
    await Likes.create({PostId:PostId, UserId:userId});
    res.json({success})
})

module.exports = router