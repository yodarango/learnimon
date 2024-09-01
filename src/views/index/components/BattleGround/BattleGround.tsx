import {
  POKEMON_STATUS_CAUGHT,
  POKEMON_STATUS_FREE,
  useBattleContext,
} from "@context";
import landscape from "@assets/images/landscape.webp";
import sphere from "@assets/images/pokeball.png";
import ashe from "@assets/images/ashe.png";

// styles
import "./BattleGround.scss";
import { If, IfElse } from "@ds";

type BattleGroundProps = {
  children: React.ReactNode;
};

export const BattleGround = (props: BattleGroundProps) => {
  const { state } = useBattleContext();
  const { children } = props;

  const pokemonCaughtClass =
    state.pokemonStatus === POKEMON_STATUS_CAUGHT ? "pokemon-caught" : "";
  return (
    <div
      className={`battle-ground-11jt ${pokemonCaughtClass}`}
      style={{
        backgroundImage: `url(${landscape})`,
      }}
    >
      <div className='battle-ground-11jt__container'>
        <div className='battle-ground-11jt__content'>{children}</div>

        <IfElse condition={state.pokemonStatus === POKEMON_STATUS_FREE}>
          <div className='battle-ground-11jt__character'>
            <div className='battle-ground-11jt__sphere'>
              <img src={sphere} alt='pokeball' />
            </div>
            <img src={ashe} alt='hunter of monsters' />
          </div>
          <h1>is yours!</h1>
        </IfElse>
      </div>
    </div>
  );
};
