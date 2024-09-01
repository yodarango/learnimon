import { RandomPokemonPicker } from "../components/RandomPokemonPicker/RandomPokemonPicker";
import { RandomTaskPicker } from "../components/RandomTaskPicker/RandomTaskPicker";
import { POKEMON_STATUS_FREE, useBattleContext } from "@context";
import { If } from "@ds";

import "./Layout.scss";
import { BattleGround } from "../components/BattleGround/BattleGround";

export const Layout = () => {
  const ctx = useBattleContext();
  const { selectedPokemon, pokemonStatus } = ctx.state;

  console.log("--------", ctx);
  return (
    <BattleGround>
      <RandomPokemonPicker />
      <If
        condition={!!selectedPokemon && pokemonStatus === POKEMON_STATUS_FREE}
      >
        <RandomTaskPicker />
      </If>
    </BattleGround>
  );
};
