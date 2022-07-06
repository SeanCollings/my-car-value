import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const SwaggerGetEstimate = () =>
  applyDecorators(
    ApiOperation({
      summary: 'get vehicle estimate',
      description: 'Get an estimate for an existing vehicle',
    }),
  );

export const SwaggerCreateReport = () =>
  applyDecorators(
    ApiOperation({
      summary: 'create report',
      description: 'Create a new report for a vehicle',
    }),
  );

export const SwaggerApproveReport = () =>
  applyDecorators(
    ApiOperation({
      summary: 'approve report',
      description: 'Approve an existing report',
    }),
  );
