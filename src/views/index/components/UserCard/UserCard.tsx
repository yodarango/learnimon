import { generatePath, Link } from "react-router-dom";
import { useBattleContext } from "@context";
import React, { HTMLProps } from "react";
import { ROUTE_HOME_USERS_SINGLE } from "@constants";
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

  const profilePath = generatePath(ROUTE_HOME_USERS_SINGLE, {
    name: String(user.name).replace(/\s/g, "-"),
  });

  const placementColorClass =
    user.placement === "1st"
      ? "bg-theta"
      : user.placement === "2nd"
      ? "bg-pi"
      : user.placement === "3rd"
      ? "bg-phi"
      : "bg-epsilon";

  return (
    <div>
      {/* card */}
      <div
        className={
          "user-card-55bb d-flex align-items-center justify-content-center bg-gamma rounded p-4 mb-4" +
          (selectedUser?.name === user.name
            ? " border border-iota"
            : "border border-zeta")
        }
        onClick={() => handleSelectUser(user)}
      >
        {/* placement */}
        <div
          className={`user-card-55bb_placement d-flex align-items-center justify-content-center p-2 ${placementColorClass}`}
        >
          <h3 className='color-beta'>{user.placement}</h3>
        </div>

        {/* thumbnail */}
        <div className='flex-shrink-0'>
          <img src={user.avatar} alt={user.name} className='d-block' />
          <h4 className='text-center'>{user.name}</h4>
        </div>

        {/* stats */}
        <div className='w-100'>
          <div className='d-flex align-items-center justify-content-start'>
            <b className='color-theta'>Pokemons</b>: {user.pokemons.length}
          </div>
          <p>
            <b className='color-kappa'>Score:</b> {user.score}
          </p>
        </div>

        {/* actions */}
        <div className='user-card-55bb_actions d-flex align-items-center justify-content-center flex-column gap-4 flex-shrink-0'>
          <div className='flex-grow-1 bg-zeta d-flex align-items-center justify-content-center '>
            <Link to={profilePath} className='w-100 color-alpha bg-nu'>
              <Button className=' bg-zeta text-center w-100'>View</Button>
            </Link>
          </div>
          <div className='flex-grow-1 bg-danger'>
            <Button
              className='bg-nu color-alpha d-flex align-items-center justify-content-center '
              onClick={() => handleDeleteUser(user.name)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
