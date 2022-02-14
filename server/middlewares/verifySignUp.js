const User = require('../model/Users.Schema')

checkDuplicateEmailOrUsername = async (req, res, next) => {
    try {
        const userName = req.body.username;
        const email = req.body.email;
        const plainTextPassword = req.body.password;
        const userWithSameEmail = await User.findOne({ email: email })
        const userWithSameUsername = await User.findOne({ username: userName })

        if (!email || typeof email !== 'string') {
            res.json({ status: 'error', message: 'Invalid email' })
            return;
        }

        if (!userName || typeof userName !== 'string') {
            res.json({ status: 'error', message: 'Invalid username' })
            return;
        }

        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
            res.json({ status: 'error', message: 'Invalid password' })
            return;
        }

        if (plainTextPassword.length < 8) {
            res.json({
                status: 'error',
                message: 'Password too small. Should be atleast 8 characters'
            })
            return;
        }


        if (userWithSameUsername) {
            res.json({ status: "error", message: "Username already exits!" });
            return;
        }

        if (userWithSameEmail) {
            res.json({ status: "error", message: "Email already associated!" });
            return;
        }
        next();
    }
    catch (err) {
        res.json(err);
        return;
    }
}

const verifySignUp = {
    checkDuplicateEmailOrUsername
};

module.exports = verifySignUp;