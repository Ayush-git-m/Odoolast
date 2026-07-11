const {
    registerUser,
    verifyOTP,
    loginUser,
    forgotPassword,
    verifyResetOTP,
    resetPassword
} = require("../services/authService");
const register = async (req, res) => {

    try {

        const message = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            message
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};
const verifyOtp = async (req,res)=>{

    try{

        const {email,otp}=req.body;

        const message=await verifyOTP(email,otp);

        res.json({

            success:true,

            message

        });

    }

    catch(error){

        res.status(400).json({

            success:false,

            message:error.message

        });

    }

}
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const data = await loginUser(email, password);

        res.json({

            success: true,

            message: "Login Successful",

            token: data.token,

            user: data.user

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};
const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        const message = await forgotPassword(email);

        return res.status(200).json({
            success: true,
            message
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const verifyResetOtpController = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const message = await verifyResetOTP(email, otp);

        return res.status(200).json({
            success: true,
            message
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

const resetPasswordController = async (req, res) => {

    try {

        const { email, password } = req.body;

        const message = await resetPassword(email, password);

        return res.status(200).json({
            success: true,
            message
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};
module.exports = {
    register,
    verifyOtp,
    login,
    forgotPasswordController,
    verifyResetOtpController,
    resetPasswordController
};