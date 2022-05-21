const express = require("express")
const router = express.Router()
const goalsController = require("../controllers/goalsController")
const protectRoute = require('../middlewares/authMiddleware')

router.post('/', protectRoute.protect, goalsController.createGoals)

router.get('/', protectRoute.protect, goalsController.getGoals)

router.put('/:id', protectRoute.protect, goalsController.updateGoal)

router.delete('/:id', protectRoute.protect, goalsController.deleteGoal)

module.exports = router