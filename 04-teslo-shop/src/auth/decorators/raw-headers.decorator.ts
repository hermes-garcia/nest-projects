import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const RawHeaders = createParamDecorator(
  (data, ctx: ExecutionContext): User | string | {} => {
    const req = ctx.switchToHttp().getRequest();
    return req.rawHeaders;
  },
);
