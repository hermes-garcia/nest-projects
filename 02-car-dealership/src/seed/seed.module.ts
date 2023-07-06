import { Module } from '@nestjs/common';
import { CarsModule } from '../cars/cars.module';
import { BrandsModule } from '../brands/brands.module';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  imports: [CarsModule, BrandsModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
