// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { data } from "autoprefixer"
import Task from "../../models/TaskModel"
import { connectMongoDB } from "../../utils/mongo"

export default async function handler(req, res) {
    if(req.method !== "POST"){
        res.status(405).send({msg : "Only post request are alloweded"})
    }

    const { task } = req.body

    try {
        await connectMongoDB()
        Task.create({task}).then((data)=>{ 
        console.log(data);
        res.status(201).send(data)})
    } catch (error) {
        console.log(error)
        res.status(400).send({err, msg : "Something went wrong"})
    }


  }
  