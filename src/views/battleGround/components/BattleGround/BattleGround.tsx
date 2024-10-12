import { POKEMON_STATUS_CAUGHT, useBattleContext } from "@context";
import landscape from "@assets/images/landscape.webp";
import { ROUTE_HOME_CHALLENGES } from "@constants";
import { useNavigate } from "react-router-dom";
import { GlowTitle } from "@components";
import { Button, IfElse } from "@ds";

// styles
import "./BattleGround.scss";

type BattleGroundProps = {
  children: React.ReactNode;
  hasChallenges: boolean;
};

export const BattleGround = (props: BattleGroundProps) => {
  const navigate = useNavigate();

  const { state } = useBattleContext();
  const { children } = props;

  const pokemonCaughtClass =
    state.pokemonStatus === POKEMON_STATUS_CAUGHT ? "pokemon-caught" : "";

  const handleGoToChallengePages = () => {
    navigate(ROUTE_HOME_CHALLENGES);
  };

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
          <div>
            <GlowTitle>No challenges available</GlowTitle>
            <Button
              onClick={handleGoToChallengePages}
              className='mt-4 mx-auto'
              primary
            >
              Create Challenges
            </Button>
          </div>
        </div>

        <div className='battle-ground-11jt__container'>
          <section>{children}</section>
        </div>
      </IfElse>
    </div>
  );
};
