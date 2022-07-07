import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ApproveReportDTO } from './dtos/approve-report.dto';
import { CreateReportDTO } from './dtos/create-report.dto';
import { GetEstimateDTO } from './dtos/get-estimate.dto';
import { ReportDTO } from './dtos/report.dto';
import {
  SwaggerApproveReport,
  SwaggerCreateReport,
  SwaggerGetEstimate,
} from './report.swagger';
import { ReportsService } from './reports.service';

@Controller('reports')
@ApiTags('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('/')
  @SwaggerGetEstimate()
  getEstimate(@Query() query: GetEstimateDTO) {
    return this.reportsService.createEstimate(query);
  }

  @Post('/')
  @SwaggerCreateReport()
  @UseGuards(AuthGuard)
  @Serialize(ReportDTO)
  async createReport(
    @Body() body: CreateReportDTO,
    @CurrentUser() user: User,
  ): Promise<ReportDTO> {
    const report = await this.reportsService.create(body, user);
    return report as unknown as ReportDTO;
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  @SwaggerApproveReport()
  @Serialize(ReportDTO)
  approveReport(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ApproveReportDTO,
  ): Promise<ReportDTO> {
    return this.reportsService.changeApproval(
      id,
      body.approved,
    ) as unknown as Promise<ReportDTO>;
  }
}
