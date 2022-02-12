const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/Users.Schema')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

// Registration Endpoint
router.post('/register', async (req, res) => {

    const userName = req.body.username;
    const plainTextPassword = req.body.password;

    if (!userName || typeof userName !== 'string') {
        return res.json({ status: 'error', message: 'Invalid username' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', message: 'Invalid password' })
    }

    if (plainTextPassword.length < 8) {
        return res.json({
            status: 'error',
            message: 'Password too small. Should be atleast 8 characters'
        })
    }

    
    const password = await bcrypt.hash(plainTextPassword, 10)

    const userRegister = new User({
        username: userName,
        password: password
    })

    userRegister.save().then(data => {
        return res.json({
            status: "success",
            message: "User Registered Successfully"
        });
    })
        .catch(error => {
            if (error.code === 11000) {
                return res.json({ status: 'error', message: 'Username already in use' })
            }
            res.json(error)
        })

})


// Login Endpoint
router.post('/login', async (req, res) => {

    const userName = req.body.username;
    const plainTextPassword = req.body.password;

    const user = await User.findOne({ username : userName })

    if (!user) {
        return res.json({ status: 'error', message: 'Invalid username/password' })
    }

    if (await bcrypt.compare(plainTextPassword, user.password)) {

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_SECRET
        )

        return res.json({ status: 'success', data: token })
    }

    res.json({ status: 'error', message: 'Invalid username/password' })


})

module.exports = router;