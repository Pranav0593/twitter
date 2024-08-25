const express = require("express");
const router = express.Router();
const {Users} = require("../models");
const bcrypt = require("bcrypt")

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
        res.sendStatus(401); // 402 for "Payment Required" isn't a typical code for this scenario; consider using 401 (Unauthorized) instead.
        return;
    } 
    bcrypt.compare(password, user.password).then((match) => {
        if (match) {
            res.sendStatus(200); // Success
        } else {
            res.sendStatus(401); // Unauthorized
        }
    }).catch(err => {
        res.status(500).send("Internal Server Error");
    });
});
module.exports = router;