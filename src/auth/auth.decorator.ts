import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./entity/user.entity";

/* export const RequestUser = createParamDecorator((_data, req): User => {
  console.log("Heres user in decorator", JSON.stringify(req.user));
  // console.log(req);
  // console.log("args user: ", req.args[0].user); // Only this is working
  return req.user;
});

*/

export const RequestUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  // console.log("Heres user in decorator", JSON.stringify(req.user));
  // console.log("args user: ", req.args[0].user); // Only this is working
  return req.user;
});