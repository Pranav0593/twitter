/* 
To grab the token that we pass when the user is logged in and verify the user and only then pass the request
*/
const {verify} = require("jsonwebtoken");
const validateToken = (req, res, next) =>{
    const accessToken = req.header("accessToken") // creating a header so that the frontend can access the accessToken
    if(!accessToken) return res.json({error:"User not logged in"});
    try{
        const validToken = verify(accessToken, "SECRET");
        if(validToken){
            return next();
        }
    }catch(err){
        return res.json({error:`Internal server error ${err}`});
    }
    
}
module.exports = {validateToken}