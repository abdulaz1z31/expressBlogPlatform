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
        const { email, password } = userData;
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
        const otp = userData?.otp
        if (otp && otpCode == otp) {
          if (otpCode != otp) {
              throw new Error("OTP in not valid")
          }
          await User.updateOne({_id: currentUser._id}, { isActive: true })
        }
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

export const activeUserService = async (userData) => {
  try {
    const { email, otp } = userData;
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      throw new Error(errorMessages.USER_NOT_FOUND)
    }
    const otpdata = await OTP.findOne({user_id:currentUser._id})
    const otpCode = otpdata.otp_code
    
    if (otpCode != otp) {
      throw new Error("OTP in not valid")
    }
    await User.updateOne({_id: currentUser._id}, { isActive: true })
    return {success:true, error:false}
  } catch (error) {
    return {success:false, error}
  }
}

export const userProfileService = async (payload) => {
    try {
        const currentUser = await User.findOne({ email: payload.email }).select({
          password: 0,
        });
        if (!currentUser) {
            throw Error(errorMessages.USER_NOT_FOUND)
        } else {
            return {success:true, error:false, user:currentUser}
        }
        
      } catch (error) {
        return {success:false, error}
      }
}

export const forgetPasswordService = async (data) => {
    try {
        const {email} = data;
        const currentUser = await User.findOne({email})
        if (!currentUser) {
            throw new Error(errorMessages.USER_NOT_FOUND)
        }    
    
        const oneTimePassword = otpGenerator();
        await sendMail(
            email,
            "OTP", 
            `This is your OTP key for change password: ${oneTimePassword}\n
            And your link to change password:"${`http://localhost:3000/user/forget/password/${currentUser._id}`}"`)
        const newp = await OTP.updateOne({user_id: currentUser._id}, {otp_code : oneTimePassword})
        console.log(newp);
        
        return {success:true, error:false}
      } catch (error) {
        return {success:false , error}
      }
}

export const changePasswordService = async (userData) => {
    try {
        const {userId, otp, newPassword} = userData;  
        const otpdata = await OTP.findOne({user_id : userId})
        const otpCode = otpdata.otp_code
        if (otpCode != otp) {
            throw new Error("Otp not valid try again")
        }
        const user = await User.findById(userId);
        user.password = newPassword;
        await user.save(); 

        return {success:true, error:false}
    } catch (error) {
        return {success:false, error}
    } 
}

export const createUserService = async (userData) => {
  try {
    const { email } = userData
    
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
      throw new Error(errorMessages.EMAIL_ALREADY_EXISTS);
    }
  } catch (error) {
    return {success:false, error}
  }
}

export const checkIsActive = async (userId) => {
  try {
      const user = await User.findOne({_id: userId});
      if (!user) {
          throw new Error(errorMessages.USER_NOT_FOUND);
      }
      return user.isActive;
  } catch (error) {
      return null;
  }
};
