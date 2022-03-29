import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "./models/User";

type RemoveIndex<T> = {
  [P in keyof T as string extends P
    ? never
    : number extends P
    ? never
    : P]: T[P];
};

interface CustomPayload extends RemoveIndex<JwtPayload> {
  userId: string;
}

export const customAuthChecker = async ({ root, args, context, info }) => {
  const userRepo = getRepository(User);
  const userJwt = context.token;
  try {
    const decoded = <CustomPayload>jwt.verify(userJwt, "supersecret");
    console.log(decoded.thisdoesnotexist);
    if (!decoded.userId) {
      return false;
    }

    const user = await userRepo.findOne(decoded.userId);
    if (!user) {
      return false;
    }

    context.user = user;
    return true;
  } catch (err) {
    return false;
  }
};
