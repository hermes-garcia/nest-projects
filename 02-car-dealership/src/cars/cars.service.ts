import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Prius',
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'CRV',
    },
    {
      id: 3,
      brand: 'Jeep',
      model: 'Patriot',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: number) {
    return this.cars.find((car) => car.id === id);
  }
}
