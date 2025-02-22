const { OK } = require("../core/successResponse");
const AuthService = require("../services/auth.service");

class AuthController {
  register = async (req, res, next) => {
    return OK({
      res,
      message: "Regiser success",
      metadata: await AuthService.register(req.body),
    });
  };
  login = async (req, res, next) => {
    return OK({
      res,
      message: "Login success",
      metadata: await AuthService.login(req.body),
    });
  };
}

module.exports = new AuthController();
