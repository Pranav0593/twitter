module.exports = (sequelize, DataTypes)=>{
    const Comments = sequelize.define("Comments", {
        commentBody:{
            type: DataTypes.STRING,
            allowNull:false
        },
        postId:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
    });

    return Comments; // returning the table object

};