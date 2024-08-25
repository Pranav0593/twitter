module.exports = (sequelize, DataTypes)=>{
    const Posts = sequelize.define("Posts", {
        // table structure
        title:{
            type: DataTypes.STRING,
            allowNULL: false // analogous to required=true in mongoDB
        },
        postText:{
            type: DataTypes.STRING,
            allowNULL: false // analogous to required=true in mongoDB
        },
        username:{
            type: DataTypes.STRING,
            allowNULL: false // analogous to required=true in mongoDB
        },
    });
    // Association creates a link between two tables
    Posts.associate = (models)=>{
        Posts.hasMany(models.Comments,{
            onDelete:"cascade",
        }) // basically tells that each post has many comments
        // This also creates a foreign key which in this case is the post id
    }
    return Posts; // returning the table object

};

// Association determine the connection between two tables, which we will be using for the comments table for the post