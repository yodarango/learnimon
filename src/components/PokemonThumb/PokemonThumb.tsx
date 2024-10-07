// styles
import { Drawer, PokemonStatsCard } from "@components";
import { HTMLProps, useState } from "react";
import "./PokemonThumb.scss";

type PokemonThumbProps = {
  pokemon: Record<string, any>;
  allowInfoModal?: boolean;
} & HTMLProps<HTMLButtonElement>;

export const PokemonThumb = (props: PokemonThumbProps) => {
  const { pokemon, className = "", allowInfoModal = true, size = 150 } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${pokemon.name} (${pokemon.value})`}
      >
        <PokemonStatsCard pokemon={pokemon} />
      </Drawer>
      <button
        className={
          "pokemon-thumb-06bq border border-zeta rounded p-0 " + className
        }
        onClick={() => {
          if (allowInfoModal) setIsOpen(true);
        }}
      >
        <div className='d-flex align-items-center justify-content-center w-100'>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            style={{ width: size, height: size }}
            className='d-block mb-2'
            alt={pokemon.name}
          />
        </div>
        <h4 className='bg-zeta pokemon-thumb-06bq_name rounded mx-auto'>
          {pokemon.name}
        </h4>
      </button>
    </>
  );
};
