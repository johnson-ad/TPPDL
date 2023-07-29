import mongoose, { models, Schema, model } from "mongoose";

const taskchema = new mongoose.Schema({
    task : {
        type : Date,
        require : true

    }
    
    // comment:{
    //     type : String,
    //     require : false
    // }
})

const Task = models.Task || mongoose.model("Post",taskchema)
export default Task;