import {
  accessKey,
  accessTime,
  refreshKey,
  refreshTime,
} from "../config/index.config.js";
import { User } from "../database/models/index.model.js";
import { createTokens } from "../helpers/jsonwebtoken.helprer.js";

import { ApiError, logger, statusCodes } from "../utils/index.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { email} = req.body;
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
    logger.info(passwordIsEqual)
    if (!passwordIsEqual) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .send(errorMessages.INVALID_CREDENTIALS);
    }

    const payload = {
      id:currentUser._id,
      name: currentUser.name,
      email:currentUser.email
     
  }
  const token = createTokens(payload)
  
  

  res.status(200).json({ message: "User logged in", token });
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createUser = (req, res, next) => {
  try {
    res.status(200).send("ok");
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const getAllUsers = (req, res, next) => {
  try {
    res.status(200).send("ok");
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const getUserById = (req, res, next) => {
  try {
    res.status(200).send("ok");
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const updateUserById = (req, res, next) => {
  try {
    res.status(200).send("ok");
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const deleteUserById = (req, res, next) => {
  try {
    res.status(200).send("ok");
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};
