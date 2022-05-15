const express = require("express")
const router = express.Router()
const goalsController = require("../controllers/goalsController")

router.post('/', goalsController.createGoals)

router.get('/', goalsController.getGoals)

router.put('/:id', goalsController.updateGoal)

router.delete('/:id', goalsController.deleteGoal)

module.exports = router