module.exports = (sequelize, DataTypes)=>{
    const Likes = sequelize.define("Likes");

    return Likes; // returning the table object

};