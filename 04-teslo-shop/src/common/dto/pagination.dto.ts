import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'How many rows do you need',
  })
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Type(() => Number) //enableImplicitConversions:true
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'How many rows do you want to skip',
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number) //enableImplicitConversions:true
  offset?: number;
}
