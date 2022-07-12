const User = require("../model/userModel");
const bcrypt = require("bcrypt");


module.exports.register = async (req, res, next) => {
    try {
        const { password, username, email } = req.body;

        const usernameCheck = await User.findOne({ username });
        const emailCheck = await User.findOne({ email });
        const hashedPassword = await bcrypt.hash(password, 10);

        if (usernameCheck) return res.json({ msg: "Usuario já existe" });
        if (emailCheck) return res.json({ msg: "Email já existe" });

        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user })
    } catch (ex) {
        next(ex)
    }
} 