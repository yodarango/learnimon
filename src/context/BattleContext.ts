import { createContext } from "react";

export type TDefaultBattleState = {
  selectedPokemon: Record<string, any> | null;
  selectedUser: Record<string, any> | null;
  selectedTask: Record<string, any> | null;
  unavailablePokemons: number[];
  pokemonStatus: number;
};

export const POKEMON_STATUS_ESCAPED = 2;
export const POKEMON_STATUS_CAUGHT = 1;
export const POKEMON_STATUS_FREE = 0;

export const initialBattleData: TDefaultBattleState = {
  pokemonStatus: POKEMON_STATUS_FREE,
  unavailablePokemons: [], // pokemons that are currently in caught by someone
  selectedPokemon: null,
  selectedTask: null,
  selectedUser: null,
};

export const defaultBattleContext = {
  state: initialBattleData,
  handlePokemonSelected: (_: Record<string, any>) => {},
  handleSelectUserAndResetState: (_: string) => {},
  handleSelectTask: (_: Record<string, any>) => {},
  handleSelectUser: (_: string) => {},
  handleResetContext: () => {},
  handleCorrect: () => {},
  handleWrong: () => {},
};

export const BattleContext = createContext(defaultBattleContext);
