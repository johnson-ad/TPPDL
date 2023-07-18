// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { data } from "autoprefixer"
import Task from "../../models/TaskModel"
import { connectMongoDB } from "../../utils/mongo"

export default async function handler(req, res) {
    if(req.method !== "GET"){
        res.status(405).send({msg : "Only get request are alloweded"})
    }

    const { task } = req.body

    try {
        await connectMongoDB()
        const tasks = await Task.find()
        res.status(200).send(tasks)
    } catch (error) {
        console.log(error)
        res.status(400).send({err, msg : "Something went wrong"})
    }


  }
  