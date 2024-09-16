import { getUserFromLocalStorage } from "@utils";
import { useParams } from "react-router-dom";

// styles
import "./Layout.scss";

export const Layout = () => {
  const { name } = useParams();

  const user = getUserFromLocalStorage(String(name));
  console.log(user);
  return (
    <div className='users-id-96jk'>
      <section className='users-id-96jk__user-bio p-4 bg-mu rounded d-flex align-items-start justify-content-start gap-6'>
        <div className='users-id-96jk__user-bio__avatar bg-alpha'>
          <img src={user.avatar} />
        </div>
        <div>
          <h2>{user.name}</h2>
          <h4>{user.placement}</h4>
          <p>Score: {user.score}</p>
          <p>Total pokemons: {user.pokemons.length}</p>
        </div>
      </section>
    </div>
  );
};
