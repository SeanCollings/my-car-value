import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const SwaggerWhoAmI = () =>
  applyDecorators(
    ApiOperation({
      summary: 'who am i',
      description: 'Get the currenly signed in user',
    }),
  );

export const SwaggerSignOut = () =>
  applyDecorators(
    ApiOperation({
      summary: 'sign out user',
      description: 'Signe out the currently signed in user.',
    }),
  );

export const SwaggerCreateUser = () =>
  applyDecorators(
    ApiOperation({
      summary: 'create a new user',
      description: 'Create a new user using an email and a password.',
    }),
  );

export const SwaggerSignIn = () =>
  applyDecorators(
    ApiOperation({
      summary: 'sign in an exising user',
      description:
        'Signin with an existing user using an email and a password.',
    }),
  );

export const SwaggerFindUser = () =>
  applyDecorators(
    ApiOperation({
      summary: 'get user by id',
      description: 'Find a particular user with a given ID',
    }),
  );

export const SwaggerFindAllUsers = () =>
  applyDecorators(
    ApiOperation({
      summary: 'get all users by email',
      description: 'Find all users with a given email',
    }),
  );

export const SwaggerRemoveUser = () =>
  applyDecorators(
    ApiOperation({
      summary: 'delete user by id',
      description: 'Delete a user with a given ID',
    }),
  );

export const SwaggerUpdateUser = () =>
  applyDecorators(
    ApiOperation({
      summary: 'update user by id',
      description: 'Update a user a user with a given ID',
    }),
  );
