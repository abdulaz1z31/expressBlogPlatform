import { logger } from "../utils/index.js";

export const roleGuard = (...roles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
      const role = req.body?.role
      
      if (roles.includes(userRole) && role != "superAdmin" ) {
        next();
      } else {
        res.status(403).send("Permission Denied");
      }
    };
  };
  