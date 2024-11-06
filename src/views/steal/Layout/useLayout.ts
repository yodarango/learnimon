import { pokemonData } from "@data";
import { useSearchParams } from "react-router-dom";

export const useLayout = () => {
  const [searchParams] = useSearchParams();

  const challenger = searchParams.get("challenger");
  const challengee = searchParams.get("challengee");
  const pokemonId = searchParams.get("pokemon");

  const selectedPokemon = pokemonData[pokemonId as string];

  const isReadyToChallenge = challenger && challengee && pokemonId;

  return {
    isReadyToChallenge,
    selectedPokemon,
    challenger,
    challengee,
    pokemonId,
  };
};
