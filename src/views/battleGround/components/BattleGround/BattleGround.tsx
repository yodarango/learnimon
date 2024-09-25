import { POKEMON_STATUS_CAUGHT, useBattleContext } from "@context";
import landscape from "@assets/images/landscape.webp";
import { Settings } from "../Settings/Settings";
import { GlowTitle } from "@components";
import { IfElse } from "@ds";

// styles
import "./BattleGround.scss";

type BattleGroundProps = {
  children: React.ReactNode;
  hasChallenges: boolean;
};

export const BattleGround = (props: BattleGroundProps) => {
  const { state } = useBattleContext();
  const { children } = props;

  const pokemonCaughtClass =
    state.pokemonStatus === POKEMON_STATUS_CAUGHT ? "pokemon-caught" : "";

  return (
    <div className={`battle-ground-11jt ${pokemonCaughtClass}`}>
      <div
        className='battle-ground-11jt__landscape'
        style={{
          backgroundImage: `url(${landscape})`,
        }}
      />
      <div className='battle-ground-11jt__bkg' />
      <IfElse condition={!props.hasChallenges}>
        <div className='battle-ground-11jt__title d-flex align-items-center justify-content-center'>
          <GlowTitle>No challenges available</GlowTitle>
        </div>
        <div className='battle-ground-11jt__container'>
          <div className='battle-ground-11jt__settings'>
            <Settings />
          </div>
          <section>{children}</section>
        </div>
      </IfElse>
    </div>
  );
};
