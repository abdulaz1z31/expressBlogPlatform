import { ApiError } from "../utils/index.js"

export const registerUser = (req, res, next) => {
    try {
        res.status(200).send("ok")
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message))
    }
}

export const loginUser = (req, res, next) => {
    try {
        res.status(200).send("ok")
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message))
    }
}



export const createUser = (req, res, next) => {
    try {
        res.status(200).send("ok")
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message))
    }
}



export const getAllUsers = (req, res, next) => {
    try {
        res.status(200).send("ok")
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message))
    }
}



export const getUserById = (req, res, next) => {
    try {
        res.status(200).send("ok")
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message))
    }
}


export const updateUserById = (req, res, next) => {
    try {
        res.status(200).send("ok")
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message))
    }
}

export const deleteUserById = (req, res, next) => {
    try {
        res.status(200).send("ok")
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message))
    }
}