import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    // create fake copy of userservice
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(user);

        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('should create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('should create a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@test.com', 'password');

    expect(user.password).not.toEqual('password');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should throw an error if user sings up with email that is in use', async () => {
    await service.signup('test@test.com', 'password');
    try {
      await service.signup('test@test.com', 'password');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe('Email in use!');
    }

    // Also this approach
    const promise = service.signup('test@test.com', 'pass');
    await expect(promise).rejects.toThrowError(BadRequestException);
  });

  it('should throw if signin is called with an unused email', async () => {
    const promise = service.signin('test@test.com', 'password');
    expect(promise).rejects.toThrowError(NotFoundException);
  });

  it('should throw if an invalid password is provided', async () => {
    await service.signup('test@test.com', 'password');
    try {
      await service.signin('test@test.com', 'different_password');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message).toBe('Invalid credentials');
    }
  });

  it('should return a user if correct password is provided', async () => {
    await service.signup('test@test.com', 'new_password');

    const user = await service.signin('test@test.com', 'new_password');
    expect(user).toBeDefined();
  });
});
