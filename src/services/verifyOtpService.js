const db = require("../config/db");

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

module.exports = {
    verifyOTP
};