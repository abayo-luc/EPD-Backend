export default (...values) => {
  const roles = values.flat();
  const isAllowed = role => roles.flat().includes(role);
  return (req, res, next) => {
    if (
      (roles.includes("owner") && req.user.id === req.params.id) ||
      (roles.includes("owner") &&
        req.user.role === "supervisor" &&
        req.user.companyId === req.params.id)
    ) {
      return next();
    }
    if (
      (req.user && isAllowed(req.user.role)) ||
      req.user.role === "superAdmin"
    ) {
      return next();
    }
    return res.status(401).json({
      error: { message: "Authorization failed." }
    });
  };
};

export const roleAssignable = (req, res, next) => {
  if (["superAdmin", "admin"].includes(req.user.role)) {
    return next();
  }
  req.body.role = undefined;
  return next();
};
