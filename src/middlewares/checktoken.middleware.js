import { verifyTokens } from "../helpers/jsonwebtoken.helprer.js";
import { errorMessages, logger, statusCodes } from "../utils/index.js";

export const checkTokens = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      logger.info(errorMessages.UNAUTHORIZED)
      return res.status(statusCodes.UNAUTHORIZED).json({ error: errorMessages.UNAUTHORIZED});
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      logger.info("Token is not found" )
      return res.status(statusCodes.UNAUTHORIZED).json({ error: "Token is not found" });
    }
    const decode = verifyTokens("access", token);

    req.user = decode;
    next();
  } catch (err) {
    logger.error("Error in token verification:", err);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error while verifying token" });
  }
};
