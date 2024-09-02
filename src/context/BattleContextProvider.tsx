import {
  TDefaultBattleState,
  initialBattleData,
  BattleContext,
  POKEMON_STATUS_CAUGHT,
  POKEMON_STATUS_ESCAPED,
} from "./BattleContext";
import { useContext, useState } from "react";
import update from "immutability-helper";

type TBattleContextProvider = {
  children: React.ReactNode;
};

export const BattleContextProvider = (props: TBattleContextProvider) => {
  const { children } = props;

  const [state, setState] = useState<TDefaultBattleState>(initialBattleData);

  const handlePokemonSelected = (pokemon: Record<string, any>) => {
    setState((prevState) =>
      update(prevState, {
        selectedPokemon: {
          $set: pokemon,
        },
      })
    );
  };

  const handleStatus = (status: number) => {
    setState((prevState) =>
      update(prevState, {
        pokemonStatus: {
          $set: status,
        },
      })
    );
  };

  const handleCorrect = () => {
    handleStatus(POKEMON_STATUS_CAUGHT);
  };

  const handleWrong = () => {
    handleStatus(POKEMON_STATUS_ESCAPED);
  };

  const handleSelectUser = (user: Record<string, any>) => {
    setState((prevState) =>
      update(prevState, {
        selectedUser: {
          $set: user,
        },
      })
    );
  };

  return (
    <BattleContext.Provider
      value={{
        state,
        handlePokemonSelected,
        handleSelectUser,
        handleCorrect,
        handleWrong,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};

export function useBattleContext() {
  const context = useContext(BattleContext);

  if (!context) {
    throw new Error(
      "useBattleContext must be used within a BattleContextProvider"
    );
  }

  return context;
}
