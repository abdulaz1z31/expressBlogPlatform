import { User } from "../database/models/index.model.js";
import { activeUserService, changePasswordService, createUserService, forgetPasswordService, loginUserService, registerUserService, userProfileService } from "../service/index.service.js";
import { ApiError, errorMessages, statusCodes } from "../utils/index.js";

export const registerUser = async (req, res, next) => {
  try {
    const result = await registerUserService(req.body)
    const {success, error} = result
    if (success) {
      return res.status(statusCodes.CREATED).send("created");
    } else {
      return res.status(statusCodes.CONFLICT).send({ message : error.message});
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const result = await loginUserService(req.body)
    const {success, error} = result;
    if (success) {
      const {token} = result;
      res.status(statusCodes.OK).json({ message: "User logged in", token });
    } else {
      res.status(statusCodes.BAD_REQUEST).send(error.message)
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const activeUser = async (req, res, next) => {
   try {
     const result = await activeUserService(req.body)
     const {success, error} = result
     if (success) {
       res.status(statusCodes.OK).send("You are activated successfully")
     } else {
       res.status(statusCodes.BAD_REQUEST).send(error.message)
     }
    } catch (error) {
      next(new ApiError(error.statusCode, error.message));
    }
};

export const userProfileController = async (req, res, next) => {
  try {
    const payload = req.user;
    const result = await userProfileService(payload)
    const {success, error} = result;
    if (success) {
      const { user } = result;
      res.status(statusCodes.OK).json({ user })
    } else {
      res.status(statusCodes.NOT_FOUND).send(error.message)
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await forgetPasswordService({email})
    const {success, error} = result
    console.log(result);
    
    if (success) {
      res.status(statusCodes.OK).send({message: "we send link to your email"})
    } else {
      res.status(statusCodes.NOT_FOUND).send(error.message)
    }
  } catch (error) {
    next(new ApiError(error.statusCodes, error));
  }
}

export const changePassword = async (req, res, next) => {
    try {
      const userId = req.params.id
      const {otp, newPassword} = req.body;
      const data = {userId, otp, newPassword}
      const result = await changePasswordService(data)
      const {success, error} = result
      if (success) {
        res.status(statusCodes.OK).send("Password changet successfully")
      } else {
        res.status(statusCodes.BAD_REQUEST).send({message:error.message})
      }

    } catch (error) {
      next(new ApiError(error.statusCodes, error));
    }
}

export const createUser = async (req, res, next) => {
  try {
    const result = await createUserService(req.body)
    const {success, error} = result
    if (success) {
      return res.status(statusCodes.CREATED).send("created");
    } else {
      return res.status(statusCodes.BAD_REQUEST).send(error.message);
    }
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};





export const getAllUsers = async (req, res, next) => {
  try { 
    const searchQuery = req.query.search ? { name: new RegExp(req.query.search, 'i') } : {}; 
    const users = await User.find(searchQuery)
      .skip(req.pagination.skip)
      .limit(req.pagination.limit);

    const totalUsers = await User.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalUsers / req.pagination.limit);

    res.status(statusCodes.OK).send({
      users,
      currentPage: req.pagination.page,
      totalPages,
      totalUsers,
    });
  } catch (error) {
    next(new ApiError(error.statusCodes || 500, error.message || 'Server Error'));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
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

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(statusCodes.NOT_FOUND).send({ message: "user not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

