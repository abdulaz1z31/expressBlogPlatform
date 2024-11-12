import { User } from "../database/models/index.model.js";
import { createTokens } from "../helpers/jsonwebtoken.helprer.js";

import { ApiError, errorMessages, statusCodes } from "../utils/index.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      console.log({ currentUser });
      const user = new User(req.body);
      console.log({ user });

      await user.save();
      return res.status(statusCodes.CREATED).send("created");
    }
    return res
      .status(statusCodes.CONFLICT)
      .send(errorMessages.EMAIL_ALREADY_EXISTS);
  } catch (error) {
    console.log(error);
    next(new ApiError(error.statusCode, error.message));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.USER_NOT_FOUND);
    }

    const passwordIsEqual = await currentUser.compare(password);
    if (!passwordIsEqual) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .send(errorMessages.INVALID_CREDENTIALS);
    }

    const payload = {
      id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
    };
    const token = createTokens(payload);

    res.status(200).json({ message: "User logged in", token });
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const userProfileController = async (req, res, next) => {
  try {
    const payload = req.user;
    const currentUser = await User.findOne({ email: payload.email }).select({
      password: 0,
    });
    if (!currentUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.USER_NOT_FOUND);
    }
    return res.send(currentUser);
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      const user = new User(req.body);
      await user.save();
      return res.status(statusCodes.CREATED).send("created");
    }
    return res
      .status(statusCodes.CONFLICT)
      .send(errorMessages.EMAIL_ALREADY_EXISTS);
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(statusCodes.OK).send({ users });
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
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
