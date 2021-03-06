const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");
const APIError = require("../utils/APIErrors");
const { secretKey, env } = require("../../config/vars");

module.exports.signup = async (req, res, next) => {
    try {
        const { email, name, password, phone, age, gender } = req.body;

        const isEmailExisted = await UserModel.findOne({
            email
        }).lean();
        if (isEmailExisted) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({
                    msg: "This email is already taken"
                })
                .end();
        }

        const newUser = await new UserModel({
            email,
            name,
            password,
            phone,
            age: parseInt(age),
            gender
        }).save();

        return res
            .status(httpStatus.CREATED)
            .json({
                user: newUser,
                msg: "Successfully create new account"
            })
            .end();
    } catch (error) {
        next(error);
    }
};

module.exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findUserByEmail(email);
        if (user instanceof APIError) {
            return res
                .status(user.status)
                .json({
                    msg: user.message
                })
                .end();
        }

        const isPasswordMatched = await user.comparePassword(password);
        if (isPasswordMatched instanceof APIError) {
            return res
                .status(isPasswordMatched.status)
                .json({
                    msg: isPasswordMatched.message
                })
                .end();
        }

        const token = await jwt.sign(
            {
                id: user._id
            },
            secretKey.value,
            {
                expiresIn: secretKey.expiration + "h"
            }
        );

        res.cookie("jwt", 'Bearer ' +token, {
            maxAge: secretKey.expiration * 3600,
            httpOnly: env === "production" ? true : false
        });

        return res
            .status(httpStatus.OK)
            .json({
                msg: "Đăng nhập thành công, chờ xíu.",
                user,
                token: "Bearer " + token,
                tokenExpiration: secretKey.expiration * 3600
            })
            .end();
    } catch (error) {
        next(error);
    }
};

module.exports.logout = (req, res, next) => {
    try {
        res.clearCookie("jwt");

        return res
            .status(httpStatus.OK)
            .json({
                msg: "Cookie cleared"
            })
            .end();
    } catch (error) {
        next(error);
    }
};
