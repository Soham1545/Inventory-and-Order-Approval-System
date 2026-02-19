const bcrypt = require('bcryptjs');
const Users = require('../models/user');

const generateToken = require('../utils/generateToken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required",
        });
        }
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not invited",
            });
        }
        if (user.password) {
            return res.status(409).json({
                message: "User already registered",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.name = name;
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
        message: "Signup successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        });
    } catch (error) {
        res.status(500).json({
        message: "Signup failed",
        error: error.message,
        });
    }
};


exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required"
            });
        };
        const user = await Users.findOne({email}).select('+password');
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message: 'Invalid password'
            });
        }
        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'Login successful',
        });
    } catch(error){
        res.status(500).json({
            message: "Login failed",
            error: error.message
        })
    }
}

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
      error: error.message,
    });
  }
};
