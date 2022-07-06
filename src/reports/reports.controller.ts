import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportDTO } from './dtos/report.dto';
import { Report } from './report.entity';
import { SwaggerCreateReport } from './report.swagger';
import { ReportsService } from './reports.service';

@Controller('reports')
@ApiTags('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('/')
  @SwaggerCreateReport()
  @UseGuards(AuthGuard)
  @Serialize(ReportDTO)
  createReport(
    @Body() body: CreateReportDTO,
    @CurrentUser() user: User,
  ): Promise<Report> {
    return this.reportsService.create(body, user);
  }
}
