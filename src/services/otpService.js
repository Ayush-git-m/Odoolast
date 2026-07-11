const db = require("../config/db");

const saveOTP = (email, otp, purpose) => {

    return new Promise((resolve, reject) => {

        const expires = new Date(Date.now() + 5 * 60 * 1000);

        db.query(
            "DELETE FROM otp_codes WHERE email=? AND purpose=?",
            [email, purpose],
            (err) => {

                if (err) return reject(err);

                db.query(
                    "INSERT INTO otp_codes(email,otp,purpose,expires_at) VALUES(?,?,?,?)",
                    [email, otp, purpose, expires],
                    (err) => {

                        if (err) return reject(err);

                        resolve();

                    }
                );

            }
        );

    });

};

module.exports = {
    saveOTP
};