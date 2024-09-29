import { RandomPokemonPicker } from "../components/RandomPokemonPicker/RandomPokemonPicker";
import {
  RandomTaskPicker,
  TChallenge,
} from "../components/RandomTaskPicker/RandomTaskPicker";
import { BattleGround } from "../components/BattleGround/BattleGround";
import {
  POKEMON_STATUS_CAUGHT,
  POKEMON_STATUS_FREE,
  useBattleContext,
} from "@context";
import sphere from "@assets/images/pokeball.png";
import ashe from "@assets/images/ashe.webp";
import { useEffect, useState } from "react";
import { Button, If, IfElse } from "@ds";

// styles
import "./Layout.scss";

export const Layout = () => {
  const ctx = useBattleContext();
  const { selectedPokemon, pokemonStatus } = ctx.state;

  const [canStartChallenge, setCanStartChallenge] = useState<boolean>(false);
  const [challenges, setChallenges] = useState<TChallenge[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);

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

  const handleIsReady = () => {
    setIsReady(true);
  };

  // after the pokemon is selected, the user can start the challenge
  useEffect(() => {
    setTimeout(() => {
      if (!!selectedPokemon && pokemonStatus === POKEMON_STATUS_FREE) {
        setCanStartChallenge(true);
      }
    }, 1000);
  }, [selectedPokemon]);

  return (
    <BattleGround hasChallenges={challenges.length > 0}>
      {/* <IfElse condition={!isReady}> */}
      {/* <div className='layout15-kc__ready d-flex align-items-center justify-content-center'>
        <div>
          <Button
            onClick={handleIsReady}
            primary
            className='w-100 mx-auto'
            maxWidth={200}
          >
            Start
          </Button>
          <h1 className='text-center'>Are you ready?</h1>
        </div>
      </div> */}

      {/* <IfElse condition={pokemonStatus === POKEMON_STATUS_FREE}> */}
      <div className='battle-ground-11jt__duel d-flex align-items-center justify-content-between'>
        <div className='battle-ground-11jt__challenger'>
          <img
            src={sphere}
            alt='pokeball'
            className='battle-ground-11jt__sphere'
          />

          <img
            src={ashe}
            alt='hunter of monsters'
            className='character-11jt__character'
          />
        </div>
        <div className='battle-ground-11jt__challengee'>
          <RandomPokemonPicker />
        </div>
        <If condition={canStartChallenge}>
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
      {/* </IfElse> */}
    </BattleGround>
  );
};
