import { RandomPokemonPicker } from "../components/RandomPokemonPicker/RandomPokemonPicker";
import {
  RandomTaskPicker,
  TChallenge,
} from "../components/RandomTaskPicker/RandomTaskPicker";
import { BattleGround } from "../components/BattleGround/BattleGround";
import {
  POKEMON_STATUS_CAUGHT,
  POKEMON_STATUS_ESCAPED,
  POKEMON_STATUS_FREE,
  useBattleContext,
} from "@context";
import PokeballBottom from "@assets/images/pokeball_bottom.png";
import PokeballTop from "@assets/images/pokeball_top.png";
import ashe from "@assets/images/ashe.webp";
import { useEffect, useState } from "react";
import { Button, If, IfElse } from "@ds";

// styles
import "./Layout.scss";
import { PokemonStatsCard } from "@components";

export const Layout = () => {
  const ctx = useBattleContext();
  const { selectedPokemon, pokemonStatus } = ctx.state;

  const [canStartChallenge, setCanStartChallenge] = useState<boolean>(false);
  const [isReadyToTest, setIsReadyToTest] = useState<boolean>(false);
  // Responsible for showing a pokemon as captured or escaped
  const [updatedPokemonStatus, setUpdatedPokemonStatus] =
    useState<number>(POKEMON_STATUS_FREE);
  const [challenges, setChallenges] = useState<TChallenge[]>([]);
  const [isReady, setIsReadyToSelect] = useState<boolean>(false);

  useEffect(() => {
    const challenges = localStorage.getItem("learnimon__challenges");
    if (challenges) {
      if (challenges.length === 0) {
        setChallenges([]);
      } else {
        setChallenges(JSON.parse(challenges));
      }
    }
  }, []);

  const handleIsReadyToSelect = () => {
    setIsReadyToSelect(true);
  };

  const handleIsReadyToTest = () => {
    setIsReadyToTest(true);
  };

  // after the pokemon is selected, the user can start the challenge
  useEffect(() => {
    setTimeout(() => {
      if (!!selectedPokemon && pokemonStatus === POKEMON_STATUS_FREE) {
        setCanStartChallenge(true);
      }
    }, 1000);
  }, [selectedPokemon]);

  // after the challenge is finished, update the pokemon status
  useEffect(() => {
    setTimeout(() => {
      setUpdatedPokemonStatus(pokemonStatus);
    }, 1000);
  }, [pokemonStatus]);

  const caughtStatusClass =
    pokemonStatus === POKEMON_STATUS_CAUGHT
      ? "caught"
      : pokemonStatus === POKEMON_STATUS_ESCAPED
      ? "escaped"
      : "";

  console.log(
    "challenges",
    isReadyToTest && pokemonStatus === POKEMON_STATUS_FREE
  );
  return (
    <BattleGround hasChallenges={challenges.length > 0}>
      <IfElse condition={!isReady}>
        {/* Overlay that will display if the user is not yet ready to be tested */}
        <div className='layout15-kc__ready d-flex align-items-center justify-content-center'>
          <div>
            <Button
              onClick={handleIsReadyToSelect}
              primary
              className='w-100 mx-auto'
              maxWidth={200}
            >
              Start
            </Button>
            <h1 className='text-center'>Are you ready?</h1>
          </div>
        </div>

        <div>
          {/* <IfElse condition={pokemonStatus === POKEMON_STATUS_FREE}> */}
          <div className='battle-ground-11jt__duel d-flex align-items-center justify-content-between w-100'>
            {/* Card responsible for shwoing the pokemon stats after is selected */}
            <If condition={!!selectedPokemon}>
              <div className='battle-ground-11jt__pokemon-stats-card'>
                <PokemonStatsCard
                  pokemon={selectedPokemon as Record<string, any>}
                  includeTotalValue
                />

                <Button
                  onClick={handleIsReadyToTest}
                  className='w-100 mt-4'
                  primary
                >
                  GO
                </Button>
              </div>
            </If>
            {/* The "Ash" character catching the pokemon */}
            <div className='battle-ground-11jt__challenger'>
              <img
                className='character-11jt__character'
                alt='hunter of monsters'
                src={ashe}
              />
            </div>
            {/* the poke Ball that will display only if the user catches the pokemon. It travels to the right and opens itself up in order to create the illusion of catching the pokemon  */}
            <If condition={updatedPokemonStatus === POKEMON_STATUS_CAUGHT}>
              <aside className='battle-ground-11jt__ball'>
                <img src={PokeballTop} alt='pokeball top' />
                <img src={PokeballBottom} alt='pokeball bottom' />
              </aside>
            </If>
            {/* The pokemon to be caught. It includes an animation of randomly iteratized pokemons to reflect the random selection  */}
            <div
              className={`battle-ground-11jt__challengee ${caughtStatusClass}`}
            >
              <RandomPokemonPicker />
            </div>
          </div>
          {/* This is the random task to be completed by the user in order to catch the pokemon */}
          <If
            condition={isReadyToTest && pokemonStatus === POKEMON_STATUS_FREE}
          >
            <div className='battle-ground-11jt__task bg-beta'>
              <div>
                <RandomTaskPicker />
              </div>
            </div>
          </If>
        </div>
        {/* <IfElse condition={pokemonStatus === POKEMON_STATUS_CAUGHT}>
        <h1>
          <span className='d-inline-block me-6'>
            {selectedPokemon?.pokemon?.name}
          </span>{" "}
          is yours!
        </h1>
        <h1>
          <span className='d-inline-block me-6'>
            {selectedPokemon?.pokemon?.name}
          </span>{" "}
          has escaped
        </h1>
      </IfElse> */}
        {/* </IfElse> */}
      </IfElse>
    </BattleGround>
  );
};
