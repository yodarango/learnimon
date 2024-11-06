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
import { useBattleContext } from "@context";
import { useEffect, useState } from "react";
import { pokemonData } from "@data";

// placeholder images for the loading animation
export const images: string[] = [
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

export const useRandomPokemonPicker = () => {
  const ctx = useBattleContext();

  const { state, handlePokemonSelected } = ctx;
  const { selectedPokemon: pokemon, unavailablePokemons } = state;

  const [randomNumber, setRandomNumber] = useState<number | null>(null); // The id of the selected pokemon image to be displayed
  const [animationIndex, setAnimationIndex] = useState<number>(0); // The index of the image to be displayed in the loading animation
  const [loading, setLoading] = useState<boolean>(false); // The loading state of the component

  // I get a random Pokemon from the Pokemon API and set it as the selected Pokemon
  async function getRandomPokemon() {
    setLoading(true);

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
      data.id = number;

      // if this Pokemon is unavailable, get another one
      if (unavailablePokemons.includes(data.id)) {
        getRandomPokemon();
        return;
      }

      // setPokemon(data);
      handlePokemonSelected(data);
      setLoading(false);
    }, 3000);
  }

  useEffect(() => {
    getRandomPokemon();
  }, []);

  return { randomNumber, animationIndex, loading, getRandomPokemon, pokemon };
};
