import { generatePath, Link } from "react-router-dom";
import { useBattleContext } from "@context";
import React, { HTMLProps } from "react";
import { ROUTE_USER } from "@constants";
import { Button } from "@ds";

// styles
import "./UserCard.scss";

type TUser = Record<string, any>;
export const UserCard: React.FC<HTMLProps<HTMLDivElement> & TUser> = (
  props
) => {
  const { state } = useBattleContext();

  const { selectedUser } = state;
  const { user, handleDeleteUser, handleSelectUser } = props;

  const profilePath = generatePath(ROUTE_USER, {
    name: String(user.name).replace(/\s/g, "-"),
  });

  return (
    <div>
      <div
        className={
          "user-card-55bb d-flex align-items-center flex-column justify-content-center bg-gamma rounded p-4 mb-4" +
          (selectedUser?.name === user.name
            ? " border border-iota"
            : "border border-zeta")
        }
        onClick={() => handleSelectUser(user)}
      >
        <img src={user.avatar} alt={user.name} className='d-block' />
        <h4>{user.name}</h4>
        <p>
          <b className='color-theta'>Pokemons</b>: {user.pokemons.length}
        </p>
        <p>
          <b className='color-kappa'>Score:</b> {user.score}
        </p>
      </div>
      <div className='d-flex align-items-center justify-content-center gap-4'>
        <Link to={profilePath} className='w-100 d-block'>
          <Button className='bg-nu color-zeta text-center w-100'>View</Button>
        </Link>
        <Button
          className='bg-nu color-danger w-100'
          onClick={() => handleDeleteUser(user.name)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
