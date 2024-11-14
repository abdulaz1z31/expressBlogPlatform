import {
  activeUserService,
  changePasswordService,
  createUserService,
  deleteUserByIdService,
  forgetPasswordService,
  getAllUsersService,
  getUserByIdService,
  loginUserService,
  registerUserService,
  searchUserService,
  updateUserByIdService,
  userProfileService,
} from "../service/index.service.js";

import { ApiError, errorMessages, statusCodes } from "../utils/index.js";


//bunda user malumotlari db yozadi va email ga opt jonatadi
export const registerUser = async (req, res, next) => {
  try {
    const result = await registerUserService(req.body);
    const { success, error } = result;
    if (success) {
      return res.status(statusCodes.CREATED).send("created");
    } else {
      return res.status(statusCodes.CONFLICT).send({ message: error.message });
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error));
  }
};
//loginda malumotlar bilan otp yuborilsa isActive ture qilib qoyadi yubormasa ham boladi unda false qoladi
export const loginUser = async (req, res, next) => {
  try {
    const result = await loginUserService(req.body);
    const { success, error } = result;
    if (success) {
      const { token } = result;
      res.status(statusCodes.OK).json({ message: "User logged in", token });
    } else {
      res.status(statusCodes.BAD_REQUEST).send(error.message);
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error));
  }
};
//false qolgan ni true qilish ucun endpoint
export const activeUser = async (req, res, next) => {
  try {
    const result = await activeUserService(req.body);
    const { success, error } = result;
    if (success) {
      res.status(statusCodes.OK).send("You are activated successfully");
    } else {
      res.status(statusCodes.BAD_REQUEST).send(error.message);
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error));
  }
};
//oz profilin korish
export const userProfileController = async (req, res, next) => {
  try {
    const payload = req.user;
    const result = await userProfileService(payload);
    const { success, error } = result;
    if (success) {
      const { user } = result;
      res.status(statusCodes.OK).json({ user });
    } else {
      res.status(statusCodes.NOT_FOUND).send(error.message);
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};
//bunda emailga otp va postman uchun likn jonatadi passwordni almashtirish uchun
export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await forgetPasswordService({ email });
    const { success, error } = result;
    console.log(result);

    if (success) {
      res
        .status(statusCodes.OK)
        .send({ message: "we send link to your email" });
    } else {
      res.status(statusCodes.NOT_FOUND).send(error.message);
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};
//bunda usha otp bilan newPassword jonatiladi va parol ozgaradi
export const changePassword = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { otp, newPassword } = req.body;
    const data = { userId, otp, newPassword };
    const result = await changePasswordService(data);
    const { success, error } = result;
    if (success) {
      res.status(statusCodes.OK).send("Password changet successfully");
    } else {
      res.status(statusCodes.BAD_REQUEST).send({ message: error.message });
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};
//name boyich search
export const searchUser = async (req, res, next) => {
  try {
    const searchText = req.query.name;
    const skip = req.pagination.skip;
    const limit = req.pagination.limit;
    const result = await searchUserService(searchText, skip, limit);
    const { success, error } = result;
    
    if (success) {
      const { users } = result;
      res.status(statusCodes.OK).send({ data: users });
    } else {
      res.status(statusCodes.BAD_REQUEST).send({ message: error.message });
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};

//bunda isActive tue bolgaman adminlar user yarata olmaydi faqat admin va superAdmin user yarataoladi
export const createUser = async (req, res, next) => {
  try {
    const result = await createUserService(req.body);
    const { success, error } = result;
    if (success) {
      return res.status(statusCodes.CREATED).send("created");
    } else {
      return res.status(statusCodes.BAD_REQUEST).send({error:error.message});
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error));
  }
};

//budan faqat admin va superAdminga ruxsat bor barcha userlarni korishga isActiveni tekshiradi olib kelish uchun
export const getAllUsers = async (req, res, next) => {
  try {
    const skip = req.pagination.skip;
    const limit = req.pagination.limit;
    const result = await getAllUsersService({ skip, limit });
    const { success, error } = result;
    if (success) {
      const { users } = result;
      res.status(statusCodes.OK).send({ users });
    } else {
      res.status(statusCodes.NOT_FOUND).send(error);
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};
//bundan pastdagi hammasida bu amalni qilish uchun yo admin yo superAdmin bolishi kerak va yoki uzi bolishi kerak uzida ham cheklovlar bor role larini ozgartira olmaydi
export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = getUserByIdService(userId);
    if (!user) {
      res.status(statusCodes.NOT_FOUND).send({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const { role } = req.user;
    const updateData = { ...req.body, role };
    const userId = req.params.id;
    const result = await updateUserByIdService(userId, updateData);
    const { success, error } = result;

    if (success) {
      const { user } = result;
      res.status(statusCodes.OK).send({ message: "User updated", user });
    } else {
      res.status(statusCodes.BAD_REQUEST).send(error.message);
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error));
  }
};
//bunda userga briktirilgan otp ham ochib ketadi
export const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = deleteUserByIdService(userId);
    const { success, error } = result;
    if (success) {
      res.status(statusCodes.CREATED).send(errorMessages.USER_NOT_FOUND);
    } else {
      res.status(statusCodes.BAD_REQUEST).send(error.message);
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error));
  }
};
