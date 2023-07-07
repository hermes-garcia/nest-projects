export interface PokeapiResponse {
  count: number;
  next: string;
  previous: null;
  results: TinyPokemon[];
}
export interface TinyPokemon {
  name: string;
  url: string;
}
