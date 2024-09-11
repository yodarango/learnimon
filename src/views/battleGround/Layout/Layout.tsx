import { RandomPokemonPicker } from "../components/RandomPokemonPicker/RandomPokemonPicker";
import {
  RandomTaskPicker,
  TChallenge,
} from "../components/RandomTaskPicker/RandomTaskPicker";
import { BattleGround } from "../components/BattleGround/BattleGround";
import { POKEMON_STATUS_FREE, useBattleContext } from "@context";
import { Settings } from "../components/Settings/Settings";
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

  if (challenges.length === 0) {
    return (
      <BattleGround>
        <Settings />
        <h1 className='text-center'>No challenges available</h1>
      </BattleGround>
    );
  }

  const handleIsReady = () => {
    setIsReady(true);
  };

  return (
    <BattleGround>
      <Settings />
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
    </BattleGround>
  );
};
