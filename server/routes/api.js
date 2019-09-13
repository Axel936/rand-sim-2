const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Message = require('../models/Message').model

router.post('/login/', function (req, res) {
    const username = req.body.username

    User.findOne({ name: username }, function (err, existingUser) {

        const user = existingUser ?
            existingUser :
            new User({ name: username, friends: [], messages: [] })

        if (!existingUser) { user.save() }

        res.send(user)
    })
})


router.post('/message', function (req, res) {
    const payload = req.body
    const message = new Message({ sender: payload.sender, text: payload.text })

    User.findOne({ name: payload.to }, function (err, user) {
        user.messages.push(message)
        user.save()
        res.end()
    })
})

router.get(`/verifyuser/:userName`, function(req, res){ 
    let userName = req.params.userName
    User.findOne({name: userName}, function(err, exitst){
        exitst ? res.send(true) : res.send(false)
    })
})
module.exports = router