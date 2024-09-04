import { RandomPokemonPicker } from "../components/RandomPokemonPicker/RandomPokemonPicker";
import { RandomTaskPicker } from "../components/RandomTaskPicker/RandomTaskPicker";
import { BattleGround } from "../components/BattleGround/BattleGround";
import { POKEMON_STATUS_FREE, useBattleContext } from "@context";
import { Settings } from "../components/Settings/Settings";
import { If } from "@ds";

export const Layout = () => {
  const ctx = useBattleContext();
  const { selectedPokemon, pokemonStatus } = ctx.state;

  console.log("--------", ctx);
  return (
    <BattleGround>
      <Settings />
      <RandomPokemonPicker />
      <If
        condition={!!selectedPokemon && pokemonStatus === POKEMON_STATUS_FREE}
      >
        <RandomTaskPicker />
      </If>
    </BattleGround>
  );
};
