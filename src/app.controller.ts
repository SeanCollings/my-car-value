import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('hello world')
  @Get()
  @ApiBearerAuth('access-token')
  getHello(): string {
    return this.appService.getHello();
  }
}
