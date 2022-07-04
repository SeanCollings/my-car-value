import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user.entity';

interface IRequest {
  session: { userId: number };
  currentUser?: User;
}

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<IRequest>();
    return request.currentUser;
  },
);
