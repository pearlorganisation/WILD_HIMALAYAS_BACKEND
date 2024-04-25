// export const generateSignupToken = () =>{
//     const token = Math.floor(Math.random() * 900000 + 100000)
//     return token
// }

import jwt from 'jsonwebtoken';

// Function to generate a JWT token
export const generateSignupToken = (data) => {
    // Create a payload containing the email and any additional data you need
    const payload =data


    // Sign the token with a secret key and set an expiration time
    const token = jwt.sign({payload}, process.env.VERIFY_EMAIL_SECRET , { expiresIn: '5m' }); // Expires in 5 minutes

    return token;
};