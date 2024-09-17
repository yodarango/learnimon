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
