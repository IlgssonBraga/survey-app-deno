import { RouterContext } from "../../../deps.ts";
import User from "../models/User.ts";

class AuthController {
  login() {}

  async register(ctx: RouterContext) {
    const { value: { name, email, password } } = await ctx.request.body();

    const user = await User.findOne({ email });

    if (user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "E-mail is already used" };
      return;
    }

    console.log({ name, email, password });
  }
}

export default new AuthController();
