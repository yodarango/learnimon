// styles
import { Drawer } from "@components";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import "./PokemonThumb.scss";
import { HTMLProps, useState } from "react";

type PokemonThumbProps = {
  pokemon: Record<string, any>;
} & HTMLProps<HTMLButtonElement>;

export const PokemonThumb = (props: PokemonThumbProps) => {
  const { pokemon, className = "" } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${pokemon.name} (${pokemon.value})`}
      >
        <PokemonCard pokemon={pokemon} />
      </Drawer>
      <button
        className={
          "pokemon-thumb-06bq border border-zeta rounded p-0 " + className
        }
        onClick={() => setIsOpen(true)}
      >
        <div className='d-flex align-items-center justify-content-center w-100'>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
            className='d-block mb-2'
          />
        </div>
        <h4 className='bg-zeta pokemon-thumb-06bq_name rounded mx-auto'>
          {pokemon.name}
        </h4>
      </button>
    </>
  );
};
