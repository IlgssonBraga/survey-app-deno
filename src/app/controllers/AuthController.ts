import { RouterContext } from "../../../deps.ts";

class AuthController {
  login() {}

  register(ctx: RouterContext) {
    console.log("Register");
  }
}

export default new AuthController();
