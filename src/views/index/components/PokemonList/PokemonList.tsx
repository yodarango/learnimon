import { useEffect, useState } from "react";

// styles
import "./PokemonList.scss";

export const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchPokemon() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10000"
      );
      const data = await response.json();
      setPokemonList(data.results);
    } catch (error) {
      console.error("Error fetching the Pokémon list:", error);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    setFilteredPokemonList(
      pokemonList.filter((pokemon: Record<string, any>) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <section>
      <input className='' onChange={({ target }) => setSearch(target.value)} />

      <div className='pokemon-container-29kf '>
        {filteredPokemonList.map((pokemon: any, index: number) => (
          <div key={index} className='pokemon-container-29kf__container'>
            <div className='pokemon-container-29kf__card'>
              <img
                className='pokemon-container-29kf__image'
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  index + 1
                }.png`}
              />
              <h4 className='text-center mb-2'>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h4>
              <p className='text-center fs-6'>ID: {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
