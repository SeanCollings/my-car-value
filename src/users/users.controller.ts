import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDTO } from './dtos/user.dto';
// import { CurrentUserInterceptor } from './interceptors/current-user.intereceptor';
import { User } from './user.entity';
import {
  SwaggerCreateUser,
  SwaggerFindAllUsers,
  SwaggerFindUser,
  SwaggerRemoveUser,
  SwaggerSignIn,
  SwaggerSignOut,
  SwaggerUpdateUser,
  SwaggerWhoAmI,
} from './user.swagger';
import { UsersService } from './users.service';

@Serialize(UserDTO)
// @UseInterceptors(CurrentUserInterceptor) // to just use this intercerptor for this controller
@Controller('auth')
@ApiTags('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/whoami')
  // @SwaggerWhoAmI()
  // whoAmI(@Session() session: any): Promise<UserDTO> {
  //   return this.usersService.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  @SwaggerWhoAmI()
  whoAmI(@CurrentUser() user: User): UserDTO {
    console.log(user);
    // we serialize the response to return UserDTO and remove password
    return user as UserDTO;
  }

  @Post('/signout')
  @SwaggerSignOut()
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  @SwaggerCreateUser()
  async createUser(
    @Body() body: CreateUserDTO,
    @Session() session: any,
  ): Promise<UserDTO> {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  @HttpCode(200)
  @SwaggerSignIn()
  async signin(
    @Body() body: CreateUserDTO,
    @Session() session: any,
  ): Promise<UserDTO> {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  @SwaggerFindUser()
  findUser(@Param('id', ParseIntPipe) id: number): Promise<UserDTO> {
    return this.usersService.findOne(id);
  }

  @Get()
  @SwaggerFindAllUsers()
  findAllUsers(@Query('email') email: string): Promise<UserDTO[]> {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  @SwaggerRemoveUser()
  removeUser(@Param('id', ParseIntPipe) id: number): Promise<UserDTO> {
    return this.usersService.remove(id);
  }

  @Patch('/:id')
  @SwaggerUpdateUser()
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UserDTO> {
    return this.usersService.update(id, body);
  }
}
