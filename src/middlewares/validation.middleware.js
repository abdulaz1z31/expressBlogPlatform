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