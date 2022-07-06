import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDTO, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;

    return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    if (!id) {
      return null;
    }

    try {
      const report = await this.repo.findOneByOrFail({ id });
      report.approved = approved;
      return this.repo.save(report);
    } catch {
      throw new NotFoundException('Report not found');
    }
  }
}
