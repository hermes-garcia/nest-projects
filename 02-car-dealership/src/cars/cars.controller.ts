import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    const car = this.carsService.findOneById(id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
    return car;
  }

  @Post()
  createCar(@Body() payload) {
    console.log(payload);
    return {
      payload,
      msg: 'post',
    };
  }

  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() payload) {
    console.log(payload);
    return {
      payload,
      msg: 'patch',
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    console.log({ id });
    return {
      id,
      msg: 'delete',
    };
  }
}
