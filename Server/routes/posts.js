const express = require("express");
const router = express.Router();
const {Posts} = require("../models");
router.get("/", async (req, res)=>{
    const listOfPosts =  await Posts.findAll(); // getting all the data from the database using sequelize
    res.json(listOfPosts);
});
router.get("/byid/:id",async(req, res)=>{
    const id = req.params.id
    const post = await Posts.findByPk(id) // this will search through the database searching through the primary key
    res.json(post)
})
router.post("/", async (req, res)=>{
    const post = req.body; // sets the posts object to the request received from the body
    await Posts.create(post); // inserts the data in the table
    res.json(post); // returns the json form of the request
});
module.exports = router;