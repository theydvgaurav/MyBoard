const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/Users.Schema')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

register = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10)
    const userRegister = new User({
        username: req.body.username,
        email: req.body.email,
        password: password
    })

    userRegister.save().then(data => {
        return res.json({
            status: "success",
            message: "User Registered Successfully"
        });
    })
        .catch(error => {
            return res.json(error)
        })

}

login = async (req, res) => {

    const user = await User.findOne({ username: req.body.username }) || await User.findOne({ email: req.body.email })

    console.log(user);

    if (!user) {
        if (req.body.email) {
            return res.json({ status: 'error', message: 'Invalid email/password' })
        }
        else {
            return res.json({ status: 'error', message: 'Invalid username/password' })
        }

    }

    if (await bcrypt.compare(req.body.password, user.password)) {

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
}

module.exports = { register, login }