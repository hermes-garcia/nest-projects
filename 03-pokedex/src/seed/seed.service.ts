import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PokeapiResponse } from './interfaces/pokeapi-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async populateDatabase() {
    const { data } = await axios.get<PokeapiResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=493`,
    );
    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonToInsert.push({ name, no });
    });

    try {
      await this.pokemonModel.insertMany(pokemonToInsert);
      return `Seed executed`;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Error while executing seed`);
    }
  }
}
