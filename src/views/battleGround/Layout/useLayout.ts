import { TChallenge } from "../components/RandomTaskPicker/RandomTaskPicker";
import { useEffect, useState } from "react";
import {
  POKEMON_STATUS_ESCAPED,
  POKEMON_STATUS_CAUGHT,
  POKEMON_STATUS_FREE,
  useBattleContext,
} from "@context";

export const useLayout = () => {
  const ctx = useBattleContext();
  const { selectedPokemon, pokemonStatus, selectedUser } = ctx.state;

  const [isChallengeFinished, setIsChallengeFinished] =
    useState<boolean>(false); // whether the user has finished with the challenge
  const [isReadyToTest, setIsReadyToTest] = useState<boolean>(false); // Whether the user is ready to start the challenge.
  // Responsible for showing a pokemon as captured or escaped
  const [updatedPokemonStatus, setUpdatedPokemonStatus] =
    useState<number>(POKEMON_STATUS_FREE); // Status separated from the context to control the timing of styling and animations
  const [challenges, setChallenges] = useState<TChallenge[]>([]); // The challenges available
  const [isReadyToSelect, setIsReadyToSelect] = useState<boolean>(false); // Whether the user is ready to start selecting the pokemon

  // get the challenges from the local storage
  function getChallenges() {
    const challenges = localStorage.getItem("learnimon__challenges");
    if (challenges) {
      if (challenges.length === 0) {
        setChallenges([]);
      } else {
        setChallenges(JSON.parse(challenges));
      }
    }
  }

  useEffect(getChallenges, []);

  const handleIsReadyToSelect = () => {
    setIsReadyToSelect(true);
  };

  const handleIsReadyToTest = () => {
    setIsReadyToTest(true);
  };

  function handleTimeoutsForAnimation() {
    // after the pokemon is selected, the user can start the challenge
    setTimeout(() => {
      if (!!selectedPokemon && pokemonStatus !== POKEMON_STATUS_FREE) {
        setIsChallengeFinished(true);
      }
    }, 4000);

    // after the challenge is finished, update the pokemon status
    setTimeout(() => {
      setUpdatedPokemonStatus(pokemonStatus);
    }, 1000);
  }

  useEffect(handleTimeoutsForAnimation, [pokemonStatus]);

  const caughtStatusClass =
    pokemonStatus === POKEMON_STATUS_CAUGHT
      ? "caught"
      : pokemonStatus === POKEMON_STATUS_ESCAPED
      ? "scaped"
      : "";

  // After the challenge is finished, I handle closing the modal and resetting the state
  function handleCloseModal() {
    setIsChallengeFinished(false);
    setIsReadyToSelect(false);
    setIsReadyToTest(false);

    ctx.handleResetContext();
  }

  return {
    handleIsReadyToSelect,
    updatedPokemonStatus,
    isChallengeFinished,
    handleIsReadyToTest,
    caughtStatusClass,
    handleCloseModal,
    isReadyToSelect,
    selectedPokemon,
    pokemonStatus,
    isReadyToTest,
    selectedUser,
    challenges,
  };
};
