const asyncHandler = require("express-async-handler")
const Goal = require('../models/goalModel')


exports.createGoals = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error ('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
    })
    
    res.status(200).json(goal)
})

exports.getGoals = asyncHandler(async(req,res)=>{
    const goals = await Goal.find()
    res.status(200).json(goals)
})

exports.updateGoal = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    console.log(goal)
    console.log('nabil')
    const updatedGoal = Goal.findByIdAndUpdate(req.params.id, req.body, {new : true,})
    console.log(updatedGoal)
    res.status(200).json(goal)
})

exports.deleteGoal = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    await goal.remove()
    res.status(200).json({id : req.params.id})
})