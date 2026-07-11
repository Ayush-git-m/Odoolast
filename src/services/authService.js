const bcrypt = require("bcrypt");
const validator = require("validator");
const db = require("../config/db");
const generateOTP = require("../utils/otpGenerator");
const { saveOTP } = require("./otpService");
const sendOTP = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const registerUser = async (userData) => {

    const { name, email, password } = userData;

    if (!name || !email || !password) {
        throw new Error("All fields are required.");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Invalid email.");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
    }

    return new Promise(async (resolve, reject) => {

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) return reject(err);

                if (result.length > 0) {
                    return reject(new Error("Email already registered."));
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users(name,email,password) VALUES(?,?,?)",
                    [name, email, hashedPassword],
                    async (err) => {

                        if (err) return reject(err);

                        const otp = generateOTP();

                        await saveOTP(email, otp, "signup");

                        await sendOTP(email, otp);

                        resolve("OTP sent successfully. Please verify your email.");
                    }
                );

            }
        );

    });

};
const verifyOTP = (email, otp) => {

    return new Promise((resolve, reject) => {

        db.query(
            "SELECT * FROM otp_codes WHERE email=? AND otp=? AND purpose='signup'",
            [email, otp],
            (err, result) => {

                if (err) return reject(err);

                if (result.length === 0) {
                    return reject(new Error("Invalid OTP"));
                }

                const otpData = result[0];

                if (new Date() > new Date(otpData.expires_at)) {
                    return reject(new Error("OTP Expired"));
                }

                db.query(
                    "UPDATE users SET is_verified=1 WHERE email=?",
                    [email],
                    (err) => {

                        if (err) return reject(err);

                        db.query(
                            "DELETE FROM otp_codes WHERE email=?",
                            [email],
                            (err) => {

                                if (err) return reject(err);

                                resolve("Email Verified Successfully");

                            }
                        );

                    }
                );

            }
        );

    });

};


const loginUser = (email, password) => {

    return new Promise((resolve, reject) => {

        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],
            async (err, result) => {

                if (err) return reject(err);

                if (result.length === 0) {
                    return reject(new Error("Invalid Email"));
                }

                const user = result[0];

                if (!user.is_verified) {
                    return reject(new Error("Please verify your email first"));
                }

                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return reject(new Error("Invalid Password"));
                }

                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d"
                    }
                );

                resolve({
                    token,
                    user
                });

            }
        );

    });

};
const forgotPassword = (email) => {

    return new Promise((resolve, reject) => {

        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],
            async (err, result) => {

                console.log("Received Email:", email);
                console.log("Query Result:", result);
                if (err) return reject(err);

                if (result.length === 0) {
                    return reject(new Error("Email not found"));
                }

                const otp = generateOTP();

                await saveOTP(email, otp, "forgot_password");

                await sendOTP(email, otp);

                resolve("OTP sent successfully.");

            }
        );

    });

};
const verifyResetOTP = (email, otp) => {

    return new Promise((resolve, reject) => {

        db.query(
            "SELECT * FROM otp_codes WHERE email = ? AND otp = ? AND purpose = 'forgot_password'",
            [email, otp],
            (err, result) => {

                if (err) return reject(err);

                if (result.length === 0) {
                    return reject(new Error("Invalid OTP"));
                }

                const otpData = result[0];

                if (new Date() > new Date(otpData.expires_at)) {
                    return reject(new Error("OTP Expired"));
                }

                db.query(
                    "UPDATE otp_codes SET is_verified = 1 WHERE email = ? AND otp = ? AND purpose = 'forgot_password'",
                    [email, otp],
                    (err) => {

                        if (err) return reject(err);

                        resolve("OTP Verified Successfully");

                    }
                );

            }
        );

    });

};
const resetPassword = (email, password) => {

    return new Promise((resolve, reject) => {

        db.query(
            "SELECT * FROM otp_codes WHERE email = ? AND purpose = 'forgot_password' AND is_verified = 1",
            [email],
            async (err, result) => {

                if (err) return reject(err);

                if (result.length === 0) {
                    return reject(new Error("Please verify OTP first."));
                }

                try {

                    const hashedPassword = await bcrypt.hash(password, 10);

                    db.query(
                        "UPDATE users SET password = ? WHERE email = ?",
                        [hashedPassword, email],
                        (err) => {

                            if (err) return reject(err);

                            db.query(
                                "DELETE FROM otp_codes WHERE email = ? AND purpose = 'forgot_password'",
                                [email],
                                (err) => {

                                    if (err) return reject(err);

                                    resolve("Password Reset Successfully");

                                }
                            );

                        }
                    );

                } catch (error) {
                    reject(error);
                }

            }
        );

    });

};
module.exports = {
    registerUser,
    verifyOTP,
    loginUser,
    forgotPassword,
    verifyResetOTP,
    resetPassword
};