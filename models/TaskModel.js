import mongoose, { models, Schema, model } from "mongoose";

const taskchema = new mongoose.Schema({
    task : {
        type : String,
        require : true

    }
})

const Task = models.Task || mongoose.model("Post",taskchema)
export default Task;