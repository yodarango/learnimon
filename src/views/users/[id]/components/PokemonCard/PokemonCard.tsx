// styles
import "./PokemonCard.scss";

export const PokemonCard = (props: { pokemon: Record<string, any> }) => {
  const { pokemon } = props;

  console.log(pokemon);

  const colors = [
    "bg-sigma",
    "bg-tau",
    "bg-upsilon",
    "bg-chi",
    "bg-iota",
    "bg-zeta",
  ];

  // types of pokemon
  // const colors = {
  //   fire: "#FDDFDF",
  //   grass: "#DEFDE0",
  //   electric: "#FCF7DE",
  //   water: "#DEF3FD",
  //   ground: "#f4e7da",
  //   rock: "#d5d5d4",
  //   fairy: "#fceaff",
  //   poison: "#98d7a5",
  //   bug: "#f8d5a3",
  //   dragon: "#97b3e6",
  //   psychic: "#eaeda1",
  //   flying: "#F5F5F5",
  //   fighting: "#E6E0D4",
  //   normal: "#F5F5F5",
  // };
  return (
    <article className='pokemon-card-18ht rounded p-4 d-flex align-items-center justify-content-center'>
      <div className='pokemon-card-18ht__avatar flex-shrink-0'>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
        />
      </div>

      <div className='pokemon-card-18ht__stats w-100'>
        {pokemon.stats.map((stat: Record<string, any>, index: number) => (
          <div key={stat.stat_name} className='pokemon-card-18ht__stat mb-3'>
            <p className='mb-1'>
              {stat.stat_name}: {stat.base_stat}
            </p>
            <div className='pokemon-card-18ht__stat-progress bg-alpha'>
              <div
                style={{ width: stat.base_stat * 0.65 + "%" }}
                className={colors[index]}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};
