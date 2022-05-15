
exports.createGoals = (req,res) => {
    res.status(200).json({message : 'Set goals'})
}

exports.getGoals = (req,res)=>{
    res.status(200).json({message : 'Get goals'})
}

exports.updateGoal = (req,res)=>{
    res.status(200).json({message : `Update goal ${req.params.id}`})
}

exports.deleteGoal = (req,res)=>{
    res.status(200).json({message : `Delete goal ${req.params.id}`})
}