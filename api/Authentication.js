const express = require("express");
const router = express.Router();
const moduleUsage = require("../modules/Authentication");
const jwt = require("../middlewares/jwt")

router.get(`/login`, async (req, res) => {
    try {
        let username = req.query.username
        let password = req.query.password
        let result = await moduleUsage.LogIn(username, password)
        res.send(result)
    } catch (error) {

    }

})

router.get('/login-jwt', async (req, res) => {
    try {
        let username = req.query.username
        let password = req.query.password
        let result = await moduleUsage.LogInJwt(username, password)
        res.send(result)
    } catch (error) {

    }
})

router.get('/get_authen', async (req, res) => {
    try {
        let result = await moduleUsage.GetAuthen()
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

router.get('/get_authen_jwt', jwt.verifyToken, async (req, res) => {
    try {
        let result = await moduleUsage.GetAuthen()
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})


module.exports = router