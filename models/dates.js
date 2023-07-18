import mongoose from "mongoose";

const DateSchema = new mongoose.Schema({
    post : {
        type : String,
        require : true

    }
})

const Dates = mongoose.model("Post",DateSchema)
export default Dates;