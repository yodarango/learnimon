import {
  TDefaultBattleState,
  initialBattleData,
  BattleContext,
  POKEMON_STATUS_CAUGHT,
  POKEMON_STATUS_ESCAPED,
} from "./BattleContext";
import { useContext, useEffect, useState } from "react";
import update from "immutability-helper";

type TBattleContextProvider = {
  children: React.ReactNode;
};

export const BattleContextProvider = (props: TBattleContextProvider) => {
  const { children } = props;

  const [state, setState] = useState<TDefaultBattleState>(initialBattleData);

  const handlePokemonSelected = (pokemon: Record<string, any>) => {
    // the score should be extrapolated by adding the attributes of the pokemon and diving it by the amount of attributes
    const pokemonValue = pokemon.stats.reduce(
      (acc = 0, { base_stat }: { base_stat: number }) => acc + base_stat,
      0
    );

    pokemon.value = pokemonValue;
    setState((prevState) =>
      update(prevState, {
        selectedPokemon: {
          $set: pokemon,
        },
      })
    );
  };

  function handleSelectTask(task: Record<string, any>) {
    setState((prevState) =>
      update(prevState, {
        selectedTask: {
          $set: task,
        },
      })
    );
  }

  const handleStatus = (status: number) => {
    const userData = localStorage.getItem("learnimon__users");
    const parsedData = JSON.parse(userData || "[]");

    const currentUser = new URL(window.location.href).pathname.split("/").pop();
    const currentUserString = String(currentUser);

    const findUser = parsedData.find(
      (user: Record<string, any>) => user.name === currentUserString
    );

    if (!findUser && !state.selectedPokemon?.name) {
      return;
    }

    findUser.score += state.selectedPokemon!.value;
    findUser.pokemons.push(state.selectedPokemon);

    // TODO: Remove the pokemon automatically from the other users. However, there are two classes so it needs to be done on per class basis

    // save the user data
    const newUserData = parsedData.map((user: Record<string, any>) =>
      user.name === findUser.name ? findUser : user
    );

    localStorage.setItem("learnimon__users", JSON.stringify(newUserData));

    // remove the selected challenge from the local storage
    const allChallenges = localStorage.getItem("learnimon__challenges");
    const parsedChallenges = JSON.parse(allChallenges || "[]");

    if (
      parsedChallenges.length > 0 &&
      status === POKEMON_STATUS_CAUGHT &&
      state.selectedTask?.id
    ) {
      // const newChallenges = parsedChallenges.filter(
      //   (challenge: Record<string, any>) =>
      //     challenge.id !== state.selectedTask!.id
      // );
      // localStorage.setItem(
      //   "learnimon__challenges",
      //   JSON.stringify(newChallenges)
      // );
    }

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

  function handleResetContext() {
    setState(initialBattleData);
  }

  // I get the currently selected user based on the URL param if there is one
  function handleGetSelectedUser() {
    const currentUser = new URL(window.location.href).pathname.split("/").pop();
    const currentUserString = String(currentUser);

    const userData = localStorage.getItem("learnimon__users");
    const parsedData = JSON.parse(userData || "[]");

    const findUser = parsedData.find(
      (user: Record<string, any>) => user.name === currentUserString
    );

    if (!findUser) {
      return;
    }

    setState((prevState) =>
      update(prevState, {
        selectedUser: {
          $set: findUser,
        },
      })
    );
  }

  useEffect(() => {
    handleGetSelectedUser();
  }, []);

  return (
    <BattleContext.Provider
      value={{
        state,
        handlePokemonSelected,
        handleResetContext,
        handleSelectTask,
        // handleSelectUser,
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
