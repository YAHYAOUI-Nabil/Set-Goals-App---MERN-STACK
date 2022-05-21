const express = require("express")
const router = express.Router()
const userContrl = require("../controllers/userControllers")
const protectRoute = require('../middlewares/authMiddleware')

router.post('/login', userContrl.login)
router.post('/signup', userContrl.signup)
router.get('/me',protectRoute.protect, userContrl.getMe)

module.exports = router