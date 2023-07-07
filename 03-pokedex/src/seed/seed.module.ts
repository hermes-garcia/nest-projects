import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Pokemon, PokemonSchema } from '../pokemon/entities/pokemon.entity';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PokemonModule],
})
export class SeedModule {}
