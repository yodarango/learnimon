import { PokemonThumb } from "../components/PokemonThumb/PokemonThumb";
import { getUserFromLocalStorage } from "@utils";
import { useParams } from "react-router-dom";

// styles
import "./Layout.scss";

export const Layout = () => {
  const { name } = useParams();

  const user = getUserFromLocalStorage(String(name));
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
        <div className='users-id-user-bio-96jk_badges w-100'>
          {user.badges?.map((badge: Record<string, any>) => {
            <div key={badge.id}>
              <img src={badge.img} alt='badge' />
              <p>{badge.name}</p>
            </div>;
          })}
        </div>
      </section>

      <h2 className='mb-4'>Your pokemons</h2>
      <section className='users-id-96jk__user-pokemons'>
        {user.pokemons.map((pokemon: Record<string, any>) => (
          <PokemonThumb
            key={pokemon.id}
            pokemon={pokemon}
            className='users-id-96jk__user-pokemons-pokemon'
          />
        ))}
      </section>
    </div>
  );
};
