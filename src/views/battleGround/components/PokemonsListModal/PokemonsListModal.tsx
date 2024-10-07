import { useBattleContext } from "@context";
import { PokemonThumb } from "@components";
import React from "react";

// styles
import "./PokemonsListModal.scss";

export const PokemonsListModal = () => {
  const { state } = useBattleContext();
  const { selectedUser } = state;

  console.log(selectedUser);
  return (
    <div className='pokemons-list-modal-49bq bg-beta p-4 rounded'>
      <section className='users-id-96jk__user-pokemons d-flex align-items-start justify-content-start gap-6'>
        <div className='users-id-96jk__user-pokemons-pokemon flex-shrink-0 pt-8 mt-2'>
          <PokemonThumb pokemon={selectedUser?.pokemons[0]} size={300} />
        </div>
        <div className='pokemons-96jk__user-pokemons-list w-100'>
          <h2 className='mb-4'>Your pokemons</h2>
          <div className='pokemons-96jk__user-pokemons-grid w-100'>
            {selectedUser?.pokemons.map((pokemon: Record<string, any>) => (
              <PokemonThumb
                allowInfoModal={false}
                pokemon={pokemon}
                key={pokemon.id}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
