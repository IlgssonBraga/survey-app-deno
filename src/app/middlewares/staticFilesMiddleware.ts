import { send, Context } from "../../../deps.ts";
import { fileExists } from "../../helpers.ts";

export const staticFilesMiddleware = async (
  context: Context,
  next: Function,
) => {
  const path = `${Deno.cwd()}${context.request.url.pathname}`;
  console.log(context.request.url);
  console.log(`${Deno.cwd()}/assets`);
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/assets`,
  });
};
