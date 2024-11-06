import { BattleGround } from "@views/components/BattleGround/BattleGround";
import { Settings } from "@views/battle/[id]/components/Settings/Settings";
import PokeballBottom from "@assets/images/pokeball_bottom.png";
import PokeballTop from "@assets/images/pokeball_top.png";
import ashe from "@assets/images/ashe.webp";
import { useLayout } from "./useLayout";
import { If, IfElse } from "@ds";

// styles
import "./Layout.scss";
import { GlowTitle, PokemonStatsCard } from "@components";
import { getUserFromLocalStorage } from "@utils";
import { useBattleContext } from "@context";

export const Layout = () => {
  const { handleStealAPokemon } = useBattleContext();
  const {
    challenger,
    challengee,
    pokemonId,
    selectedPokemon,
    isReadyToChallenge,
  } = useLayout();

  return (
    <BattleGround hasChallenges>
      <div className='steal-battle-01th__settings'>
        <Settings />
      </div>
      <div className='steal-battle-01th_pokemon-stats'>
        <PokemonStatsCard
          pokemon={selectedPokemon as Record<string, any>}
          includeTotalValue
        />
      </div>

      <IfElse condition={!isReadyToChallenge}>
        <div className='layout15-kc__title mt-0 p-0 rounded mx-auto'>
          <GlowTitle className='text-center m-0'>
            Missing members for battle
          </GlowTitle>
        </div>
        <div className='steal-battle-01th__duel d-flex align-items-center justify-content-between w-100'>
          {/* The "Ash" character catching the pokemon */}
          <div className='steal-battle-01th__challenger flex-shrink-0'>
            <button
              className='steal-battle-01th__player-name bg-nu p-0 d-flex align-items-center justify-content-center'
              onClick={() =>
                handleStealAPokemon(String(pokemonId), String(challenger))
              }
            >
              <p className='py-2 p-4 rounded bg-beta d-inline-block'>
                {getUserFromLocalStorage(String(challenger))?.name}
              </p>
            </button>
            <img
              className='character-11jt__character'
              alt='hunter of monsters'
              src={ashe}
            />
          </div>

          {/* the poke Ball that will display only if the user catches the pokemon. It travels to the right and opens itself up in order to create the illusion of catching the pokemon  */}
          <If condition={true}>
            <aside className='steal-battle-01th__ball'>
              <img src={PokeballTop} alt='pokeball top' />
              <img src={PokeballBottom} alt='pokeball bottom' />
            </aside>
          </If>

          <div className='steal-battle-01th__pokemon flex-shrink-0'>
            <img
              className='character-11jt__character'
              alt='A pokemon monster'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
            />
          </div>
          {/* The pokemon to be caught. It includes an animation of randomly iteratized pokemons to reflect the random selection  */}
          <div className='steal-battle-01th__challengee flex-shrink-0'>
            <button
              className='steal-battle-01th__player-name bg-nu p-0 d-flex align-items-center justify-content-center'
              onClick={() =>
                handleStealAPokemon(String(pokemonId), String(challengee))
              }
            >
              <p className='py-2 p-4 rounded bg-beta d-inline-block'>
                {getUserFromLocalStorage(String(challengee))?.name}
              </p>
            </button>
            <img
              className='character-11jt__character'
              alt='hunter of monsters'
              src={ashe}
            />
          </div>
        </div>
      </IfElse>
    </BattleGround>
  );
};
