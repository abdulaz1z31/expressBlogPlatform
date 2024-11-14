import { checkIsActive } from "../service/user.service.js";
import { logger } from "../utils/index.js";

export const roleGuard = (...roles) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role;
      const userId = req.user.id;
      const role = req.body?.role;

      
      const isActive = await checkIsActive(userId);
    
      if (isActive && roles.includes(userRole) && role !== "superAdmin") {
        next();
      } else {
        logger.error("Permission Denied")
        res.status(403).send("Permission Denied");
      }
    } catch (error) {
      logger.error("Server Error")
      res.status(500).send("Server Error");
    }
  };
};
