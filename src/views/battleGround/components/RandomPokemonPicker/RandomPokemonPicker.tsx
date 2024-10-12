import { useRandomPokemonPicker, images } from "./useRandomPokemonPicker";
import React from "react";
import { If } from "@ds";

// styles
import "./RandomPokemonPicker.scss";

export type TPokemon = Record<string, any>;

export const RandomPokemonPicker: React.FC = () => {
  const { randomNumber, animationIndex, loading, pokemon } =
    useRandomPokemonPicker();

  return (
    <div className={"random-pokemon-picker-19bt "}>
      {/* Loading animation that iterates over the Pokemon images to mimic a randomized selection */}
      <If condition={loading}>
        <div className='random-pokemon-picker-19bt__loading-animation'>
          <img src={images[animationIndex]} alt='Loading animation' />
        </div>
      </If>

      {/* I will show up after the loading animation is done and the pokemon is selected  */}
      <If condition={!!pokemon}>
        <div className='random-pokemon-picker-19bt__monster'>
          <div
            className={
              "random-pokemon-picker-19bt__monster--monster d-flex align-items-start justify-content-center"
            }
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomNumber}.png`}
              alt={pokemon?.name || "A cartoon monster"}
            />
          </div>
        </div>
      </If>
    </div>
  );
};
