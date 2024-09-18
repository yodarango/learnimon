import { PokemonThumb } from "../components/PokemonThumb/PokemonThumb";
import BadgeImmunity from "@assets/images/badges/badge_steal.webp";
import BadgeCatch from "@assets/images/badges/badge_catch.webp";
import BadgeSteal from "@assets/images/badges/badge_steal.webp";
import { getUserFromLocalStorage } from "@utils";
import { useParams } from "react-router-dom";

// styles
import "./Layout.scss";
import { useEffect, useState } from "react";

const badgesThumbs: Record<string, any> = {
  immunity: BadgeImmunity,
  catch: BadgeCatch,
  steal: BadgeSteal,
};

const badgeLabels: Record<string, any> = {
  immunity: "Immunity",
  catch: "Catch",
  steal: "Steal",
};

const badgeClasses: Record<string, any> = {
  immunity: "color-theta",
  catch: "color-lambda",
  steal: "color-phi",
};

export const Layout = () => {
  const { name } = useParams();

  const user = getUserFromLocalStorage(String(name));

  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const badgesGroupedByType = user.badges.reduce(
      (acc: Record<string, any>, badge: Record<string, any>) => {
        if (!acc[badge.type]) {
          acc[badge.type] = [];
        }
        acc[badge.type].push(badge);
        return acc;
      },
      {}
    );
    setBadges(badgesGroupedByType);
  }, []);

  return (
    <div className='users-id-96jk'>
      <section className='users-id-96jk__user-bio p-4 bg-mu rounded d-flex align-items-start justify-content-start gap-6 mb-6'>
        <div className='users-id-96jk__user-bio__avatar bg-alpha flex-shrink-0'>
          <img src={user.avatar} />
        </div>
        <div className='flex-shrink-0'>
          <h2>{user.name}</h2>
          <h4>{user.placement}</h4>
          <p>Score: {user.score}</p>
          <p>Total pokemons: {user.pokemons.length}</p>
        </div>
        <div className='users-id-user-bio-96jk_badges d-flex align-items-start justify-content-start flex-wrap w-100 gap-4'>
          {Object.keys(badges)?.map((badge: string) => {
            return (
              <div key={badgeLabels[badge]}>
                <img src={badgesThumbs[badge]} alt='badge' />
                <h5 className={`text-center ${badgeClasses[badge]}`}>
                  {/* @ts-ignore */}
                  {badgeLabels[badge]} ({badges[badge]?.length})
                </h5>
              </div>
            );
          })}
        </div>
      </section>

      <h2 className='mb-4'>Your pokemons</h2>
      <section className='users-id-96jk__user-pokemons'>
        {user.pokemons.map((pokemon: Record<string, any>) => (
          <PokemonThumb
            className='users-id-96jk__user-pokemons-pokemon'
            pokemon={pokemon}
            key={pokemon.id}
          />
        ))}
      </section>
    </div>
  );
};
