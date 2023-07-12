import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User | string | {} => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user)
      throw new InternalServerErrorException(`User not found (request)`);

    if (typeof data === 'undefined') return user;

    if (typeof data === 'string' || data instanceof String)
      return user[`${data}`];

    if (Array.isArray(data)) {
      return Object.keys(user)
        .filter((key) => data.includes(key))
        .reduce((obj, key) => {
          obj[key] = user[key];
          return obj;
        }, {});
    }

    return user;
  },
);
