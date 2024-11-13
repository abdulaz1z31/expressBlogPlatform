import { statusCodes } from "../utils/index.js";

export const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(statusCodes.BAD_REQUEST).json({
                error: "validationError",
                details: error.details.map(detail => detail.message)
            });
        } else {
            next();
        }
    };
};


export const pagination = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    req.pagination = { limit, skip, page };
    next();
};