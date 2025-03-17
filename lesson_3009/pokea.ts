import { MongoClient, Db, Collection } from 'mongodb';
import fetch from 'node-fetch';

interface Pokemon {
    name: string;
    url: string;
}

interface PokeApiResponse {
    results: Pokemon[];
}

const DB_CONN_STRING = "mongodb://localhost:27017";
const DB_NAME = "pokemons";
const COLLECTION_NAME = "pokemons";

async function main() {
    const client: MongoClient = new MongoClient(DB_CONN_STRING);

    try {
        await client.connect();
        console.log("З'єднано з базою даних");

        const db: Db = client.db(DB_NAME);
        const collection: Collection = db.collection(COLLECTION_NAME);

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302', {});
        // const data = await response.json();
        // const pokemons = data.results;
        const data: PokeApiResponse = await response.json() as PokeApiResponse; 
        const pokemons: Pokemon[] = data.results;
        
        await collection.insertMany(pokemons);

        console.log(`${pokemons.length} покемонів у базі даних`);

        // Пошук за літерою
        const firstLetter = "V";
        const pokemonsMatching = await collection.find({name: { $regex: `^${firstLetter}`, $options: 'i' }}).toArray();

        pokemonsMatching.forEach(pokemon => {console.log(pokemon.name);});

        for (const pokemon of pokemonsMatching) {
            const pokemonDetailResponse = await fetch(pokemon.url, {});
            const pokemonDetails = await pokemonDetailResponse.json();

            await collection.updateOne(
                { name: pokemon.name },
                { $set: { details: pokemonDetails } }
            );
            console.log(`Оновлено деталі для покемона : ${pokemon.name}`);
        }
        
        // Видалення за літерою
        const secondLetter = "a";  
        const deleteResult = await collection.deleteMany({name: { $regex: `^${secondLetter}`, $options: 'i' }});

        console.log(`Видалено ${deleteResult.deletedCount} покемонів що починаються з "${secondLetter}".`);

       
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
