import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Type(() => Number) //enableImplicitConversions:true
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number) //enableImplicitConversions:true
  offset?: number;
}
