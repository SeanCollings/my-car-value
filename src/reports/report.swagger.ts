import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const SwaggerCreateReport = () =>
  applyDecorators(
    ApiOperation({
      summary: 'create report',
      description: 'Create a new report for a vehicle',
    }),
  );
