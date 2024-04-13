import auth from "../models/auth.js";


// -----------------------------------------------------------------------------------------------------------



export const verifySignupOtp = async(req,res)=>{

    try {
        
        const {otp}= req?.params;

        if(!otp){
            return res
                .status(400)
                .json({ success: false, message: "Bad Request! token is required" });
            }

            const otpDoc =await auth.findOne({otp})

            if(!otpDoc){
                return res
                .status(400)
                .json({ success: false, message: "Link is Incorrect" });
            }

            const currentDate = new Date();

            const otpExpiryDate = otpDoc.expiresAt;

            if(currentDate>otpExpiryDate){
                return res
                .status(400)
                .json({ success: false, message: "Link is expired" });
            }

            return res
.status(200)
.json({ success: true, message: "Email verified successfully" });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: `Internal Server Error! ${error.message}`,
          });
    }
}