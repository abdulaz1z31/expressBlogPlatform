import { Error } from "mongoose";
import { OTP, User } from "../database/models/index.model.js";
import { createTokens, otpGenerator, sendMail } from "../helpers/index.helper.js";
import { errorMessages } from "../utils/index.js";



export const registerUserService = async (userData) => {
  try {
    const { email } = userData;
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      const user = new User(userData);
      await user.save();
      const oneTimePassword = otpGenerator();
      
      await sendMail(email, "OTP", `this is your OTP: ${oneTimePassword}`);

      const db_otp = new OTP({
        user_id: user._id,
        otp_code: oneTimePassword,
      });
      await db_otp.save();

      return {success:true, error: false}
    } else {
        throw new Error(errorMessages.EMAIL_ALREADY_EXISTS)
    }
  } catch (error) {
    return {success:false, error:error.message}
  }
};

export const loginUserService = async (userData) => {
    try {
        const { email, password, otp } = userData;
        const currentUser = await User.findOne({ email });
    
        if (!currentUser) {
          throw new Error(errorMessages.USER_NOT_FOUND)
        }
        const passwordIsEqual = await currentUser.compare(password);
        if (!passwordIsEqual) {
            throw new Error(errorMessages.INVALID_CREDENTIALS)
        }
        const otpdata = await OTP.findOne({user_id:currentUser._id})
        const otpCode = otpdata.otp_code
        if (otpCode != otp) {
            throw new Error("OTP in not valid")
        }
        await User.updateOne({_id: currentUser._id}, { is_active: true })
        const payload = {
          id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
        };
        const token = createTokens(payload);
        return {success:true, error:false, token}
      } catch (error) {
        return {success:false, error}
      }
}