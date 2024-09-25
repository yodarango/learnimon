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

  return (
    <BattleGround hasChallenges={challenges.length > 0}>
      <IfElse condition={!isReady}>
        <div className='layout15-kc__ready'>
          <Button
            onClick={handleIsReady}
            primary
            className='w-100'
            maxWidth={200}
          >
            Start
          </Button>
          <h1 className='text-center'>Are you ready?</h1>
        </div>
        <>
          <RandomPokemonPicker />
          <If
            condition={
              !!selectedPokemon && pokemonStatus === POKEMON_STATUS_FREE
            }
          >
            <RandomTaskPicker />
          </If>
        </>
      </IfElse>
      <IfElse condition={pokemonStatus === POKEMON_STATUS_FREE}>
        <div className='battle-ground-11jt__character'>
          <div className='battle-ground-11jt__sphere'>
            <img src={sphere} alt='pokeball' />
          </div>
          <img src={ashe} alt='hunter of monsters' />
        </div>
        <IfElse condition={pokemonStatus === POKEMON_STATUS_CAUGHT}>
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
        </IfElse>
      </IfElse>
    </BattleGround>
  );
};
