import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('hello world')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    type: String,
  })
  getHello() {
    return this.appService.getHello();
  }
}
