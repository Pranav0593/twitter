const express = require("express");
const router = express.Router();
const {Users} = require("../models");
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken");
const {validateToken} = require("../middlewares/authMiddleware")
router.post("/", async (req, res)=>{
    const {username, password} = req.body; // destructuring the object to get the username and password individually
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username:username,
            password:hash // passing the hash value
        })
        res.json("Success")
    }) 
});
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    // Checking the existence of the username
    const user = await Users.findOne({ where: { username: username } });
    if (!user) {
        res.json({error:"Wrong credentials"});
        return 
    } 
    bcrypt.compare(password, user.password).then((match) => {
        if(!match){
            res.json({error:"Wrong credentials"})
            return
        }
        const accessToken = sign({username:user.username, id:user.id}, "SECRET");
        res.json({token:accessToken, username:user.username, id:user.id});
    })
});
router.get("/auth", validateToken, (req,res)=>{
    res.json(req.user);
})
module.exports = router;