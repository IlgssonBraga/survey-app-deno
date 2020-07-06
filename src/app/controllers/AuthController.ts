import {
  RouterContext,
  compareSync,
  hashSync,
  Payload,
  setExpiration,
  Jose,
  makeJwt,
} from "../../../deps.ts";
import User from "../models/User.ts";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

class AuthController {
  async login(ctx: RouterContext) {
    const { value: { email, password } } = await ctx.request.body();

    if (!email || !password) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Provide e-mail and password" };
      return;
    }

    let user = await User.findOne({ email });

    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "E-mail/password wrong" };
      return;
    }

    if (!compareSync(password, user.password)) {
      ctx.response.status = 422;
      ctx.response.body = { message: "E-mail/password wrong" };
      return;
    }

    const payload: Payload = {
      iss: user.email,
      exp: setExpiration(new Date().getTime() + 60 * 60 * 1000),
    };

    const jwt = makeJwt(
      { key: Deno.env.get("JWT_SECRET_KEY")!, header, payload },
    );

    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      jwt,
    };
  }

  async register(ctx: RouterContext) {
    const { value: { name, email, password } } = await ctx.request.body();

    let user = await User.findOne({ email });

    if (user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "E-mail is already used" };
      return;
    }

    const hashedPassword = hashSync(password);

    user = new User({ name, email, password: hashedPassword });
    await user.save();
    ctx.response.status = 201;
    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export default new AuthController();
