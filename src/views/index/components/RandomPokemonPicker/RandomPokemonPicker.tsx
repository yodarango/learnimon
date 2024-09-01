import Pokemon100 from "@assets/images/defaultPokemons/pokemon_100.png";
import Pokemon108 from "@assets/images/defaultPokemons/pokemon_108.png";
import Pokemon117 from "@assets/images/defaultPokemons/pokemon_117.png";
import Pokemon22 from "@assets/images/defaultPokemons/pokemon_22.png";
import Pokemon27 from "@assets/images/defaultPokemons/pokemon_27.png";
import Pokemon43 from "@assets/images/defaultPokemons/pokemon_43.png";
import Pokemon48 from "@assets/images/defaultPokemons/pokemon_48.png";
import Pokemon51 from "@assets/images/defaultPokemons/pokemon_51.png";
import Pokemon99 from "@assets/images/defaultPokemons/pokemon_99.png";
import Pokemon1 from "@assets/images/defaultPokemons/pokemon_1.png";
import PokeballBottom from "@assets/images/pokeball_bottom.png";
import PokeballTop from "@assets/images/pokeball_top.png";
import { pokemonData } from "@data";
import {
  POKEMON_STATUS_CAUGHT,
  POKEMON_STATUS_ESCAPED,
  useBattleContext,
} from "@context";
import React, { useEffect, useState } from "react";
import { If } from "@ds";

// styles
import "./RandomPokemonPicker.scss";

export type TPokemon = Record<string, any>;

export const RandomPokemonPicker: React.FC = () => {
  const ctx = useBattleContext();
  const { state, handlePokemonSelected } = ctx;
  const { pokemonStatus, selectedPokemon: pokemon } = state;

  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [animationIndex, setAnimationIndex] = useState<number>(0);
  // const [pokemon, setPokemon] = useState<TPokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Replace these paths with your local image paths
  const images: string[] = [
    Pokemon1,
    Pokemon22,
    Pokemon27,
    Pokemon43,
    Pokemon48,
    Pokemon51,
    Pokemon99,
    Pokemon100,
    Pokemon108,
    Pokemon117,
  ];

  const getRandomPokemon = async () => {
    console.log("Getting random Pokémon...");
    setLoading(true);
    // setPokemon(null);

    // Start the random animation
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      setAnimationIndex((prev) => (prev + 1) % images.length);
    }, 50);

    // Simulate the 3000ms delay before the random number is selected
    setTimeout(async () => {
      clearInterval(interval); // Stop the animation after 3000ms

      const number = Math.floor(Math.random() * 1024) + 1;
      setRandomNumber(number);

      const data = pokemonData[number];

      console.log(data);
      // setPokemon(data);
      handlePokemonSelected(data);
      setLoading(false);
    }, 300);
  };

  const caughtClass =
    pokemonStatus === POKEMON_STATUS_CAUGHT
      ? "caught"
      : pokemonStatus === POKEMON_STATUS_ESCAPED
      ? "escaped"
      : "";

  useEffect(() => {
    getRandomPokemon();
  }, []);

  return (
    <div className={"random-pokemon-picker-19bt " + caughtClass}>
      {loading && (
        <div className='random-pokemon-picker-19bt__loading-animation'>
          <img src={images[animationIndex]} alt='Loading animation' />
        </div>
      )}

      <If condition={!!pokemon}>
        <div className='random-pokemon-picker-19bt__monster'>
          <h3 className='text-center'>{pokemon?.name}</h3>
          <aside className='random-pokemon-picker-19bt__monster--pokeball'>
            <img src={PokeballTop} alt='pokeball top' />
            <img src={PokeballBottom} alt='pokeball bottom' />
          </aside>
          <div className='random-pokemon-picker-19bt__monster--monster d-flex align-items-start justify-content-center'>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomNumber}.png`}
              alt={"pokemon.name"}
            />
          </div>
        </div>
      </If>
    </div>
  );
};
