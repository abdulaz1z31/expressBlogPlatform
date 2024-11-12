import { logger } from "../utils/index.js";

export const isSelfRoleGuard = (...roles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
      const userId = req.user.id
      const paramsId = req.params.id

      
      if (roles.includes(userRole) || paramsId == userId) {
        next();
      } else {
        res.status(403).send("Permission Denied");
      }
    };
  };
  