import { useBattleContext } from "@context";
import { PokemonStatsCard, PokemonThumb } from "@components";

// styles
import "./PokemonsListModal.scss";

export const PokemonsListModal = () => {
  const { state } = useBattleContext();
  const { selectedUser } = state;

  return (
    <div className='pokemons-list-modal-49bq bg-beta p-4 rounded'>
      <section className='users-id-96jk__user-pokemons'>
        <h2 className='mb-4'>Most recent catch</h2>
        <div className='users-id-96jk__user-pokemons-pokemon d-flex align-items-start justify-content-start gap-4'>
          <PokemonThumb
            pokemon={selectedUser?.pokemons[0]}
            className='pokemon_thumb-96jk'
            allowInfoModal={false}
            size={300}
          />
          <PokemonStatsCard pokemon={selectedUser?.pokemons[0]} />
        </div>
        <div className='pokemons-96jk__user-pokemons-list w-100'>
          <h2 className='mb-4'>Your pokemons</h2>
          <div className='pokemons-96jk__user-pokemons-grid w-100'>
            {selectedUser?.pokemons.map(
              (pokemon: Record<string, any>, index: number) => {
                if (index === 0) return null;

                return (
                  <PokemonThumb
                    allowInfoModal={false}
                    pokemon={pokemon}
                    key={pokemon.id}
                  />
                );
              }
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
