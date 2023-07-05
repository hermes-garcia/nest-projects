import {Move, PokeapiResponse} from '../interfaces/pokeapi-response.interface.ts';
import {HttpAdapter, PokeApiAdapter, PokeApiFetchAdapter} from '../api/pokeApi.adapter.ts';

const Deprecated = (deprecationReason: string): Function => {
    return (_1: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
        return  {
            get() {
                return (...args: any[]) => {
                    console.warn(`Method ${ memberName } is deprecated with reason: ${ deprecationReason }`);
                    //! Call function with its arguments
                    propertyDescriptor.value.apply(this, args);
                    return args;
                };
            }
        }
    }
}

export class Pokemon {

    get imageUrl(): string {
        return `https://pokemon.com/${this.id}.jpg`;
    }

    constructor(
        public readonly id: number,
        public name: string,
        private readonly http: HttpAdapter,
    ) {}

    scream ():void {
        console.log(`${this.name.toUpperCase()}!!!!`);
    }

    @Deprecated('Must use speakV2 method instead')
    speak ():void {
        console.log(`${this.name}, ${this.name}`);
    }

    async getMoves(): Promise<Move[]> {
        const data = await this.http.get<PokeapiResponse>(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        return data.moves;
    }
}


const pokeApiAxios = new PokeApiAdapter();
const pokeApiFetch = new PokeApiFetchAdapter();
export const charmander = new Pokemon(4, 'Charmander', pokeApiFetch);
export const bulbasaur = new Pokemon(1, 'Bulbasaur', pokeApiAxios);

charmander.scream();
bulbasaur.speak();