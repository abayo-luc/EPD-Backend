export const roleAssignable = (req, res, next) => {
  if (["superAdmin", "admin"].includes(req.user?.role)) {
    return next();
  }
  req.body.role = undefined;
  return next();
};

class Authorize {
  static allow(...values) {
    const roles = values.flat();
    const isAllowed = role => roles.flat().includes(role);
    return (req, res, next) => {
      try {
        if (
          (roles.includes("owner") && req.user?.id === req.params.id) ||
          (req.user?.role === "supervisor" &&
            req.user?.companyId === req.params?.companyId)
        ) {
          return next();
        }
        if (
          (req.user && isAllowed(req.user?.role)) ||
          req.user?.role === "superAdmin"
        ) {
          return next();
        }
        throw new Error("Authorization failed");
      } catch (error) {
        return res.status(401).json({
          error: { message: "Authorization failed." }
        });
      }
    };
  }

  static allowOnlyMembers(...values) {
    const roles = values.flat();
    const isAllowed = role => roles.flat().includes(role);
    return (req, res, next) => {
      try {
        if (["admin", "superAdmin"].includes(req.user?.role)) {
          return next();
        }
        if (
          (req.user?.companyId === req.params.companyId ||
            req.user?.companyId === req.params.id) &&
          isAllowed(req.user?.role)
        ) {
          return next();
        }
        throw new Error("Authorization failed");
      } catch (error) {
        return res.status(401).json({
          error: { message: "Authorization failed." }
        });
      }
    };
  }
}

export default Authorize;
