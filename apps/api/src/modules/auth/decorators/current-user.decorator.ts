import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Extract current user from request
    // Implementation by Codex
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

