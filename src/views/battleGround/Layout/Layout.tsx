import { RandomPokemonPicker } from "../components/RandomPokemonPicker/RandomPokemonPicker";
import { PokemonsListModal } from "../components/PokemonsListModal/PokemonsListModal";
import { RandomTaskPicker } from "../components/RandomTaskPicker/RandomTaskPicker";
import { BattleGround } from "../components/BattleGround/BattleGround";
import { POKEMON_STATUS_CAUGHT, POKEMON_STATUS_FREE } from "@context";
import PokeballBottom from "@assets/images/pokeball_bottom.png";
import { Settings } from "../components/Settings/Settings";
import PokeballTop from "@assets/images/pokeball_top.png";
import { Backdrop, Button, If, IfElse, Modal } from "@ds";
import { GlowTitle, PokemonStatsCard } from "@components";
import ashe from "@assets/images/ashe.webp";
import { useLayout } from "./useLayout";

// styles
import "./Layout.scss";

export const Layout = () => {
  const {
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
  } = useLayout();

  return (
    <BattleGround hasChallenges={challenges.length > 0}>
      <div className='battle-ground-11jt__settings'>
        <Settings />
      </div>
      <IfElse condition={!isReadyToSelect}>
        {/* Overlay that will display if the user is not yet ready to be tested */}
        <div className='layout15-kc__ready d-flex align-items-center justify-content-center'>
          <IfElse condition={!!selectedUser}>
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
            <div>
              <GlowTitle className='text-center'>
                Select a user to start
              </GlowTitle>
            </div>
          </IfElse>
        </div>
        <IfElse condition={!isChallengeFinished}>
          {/* The task modal and the status of the current pokemon */}
          <div>
            <div className='layout15-kc__pokemon-name mt-0 p-0 rounded mx-auto'>
              <GlowTitle className='text-center m-0'>
                {selectedPokemon?.name}
              </GlowTitle>
            </div>

            <div className='battle-ground-11jt__duel d-flex align-items-center justify-content-between w-100'>
              {/* Card responsible for showing the pokemon stats after is selected */}
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
          {/* Show the corresponding modal after the pokemon is caught or it scapes */}
          <IfElse condition={pokemonStatus === POKEMON_STATUS_CAUGHT}>
            <div className='layout15-kc__pokemon-list-modal'>
              <Backdrop open={true} onClose={handleCloseModal}>
                <PokemonsListModal />
              </Backdrop>
            </div>
            <Modal
              title='Pokemon has scaped '
              open={true}
              onClose={handleCloseModal}
            >
              <p className='text-center'>Sorry, your pokemon has scaped! 😫</p>
            </Modal>
          </IfElse>
        </IfElse>
      </IfElse>
    </BattleGround>
  );
};
