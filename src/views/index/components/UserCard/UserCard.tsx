import { generatePath, useNavigate } from "react-router-dom";
import { UserSettings } from "../UserSettings/UserSettings";
import { ROUTE_HOME_USERS_SINGLE } from "@constants";
import React, { HTMLProps } from "react";

// styles
import "./UserCard.scss";

type TUser = Record<string, any>;
export const UserCard: React.FC<HTMLProps<HTMLDivElement> & TUser> = (
  props
) => {
  const navigate = useNavigate();

  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const { user, handleDeleteUser, handleSelectUser } = props;

  const profilePath = generatePath(ROUTE_HOME_USERS_SINGLE, {
    name: String(user.name).replace(/\s/g, "-"),
  });

  const handleViewUser = (evt: any) => {
    evt.stopPropagation();
    navigate(profilePath);
  };

  const handleDeleteUserAndStopPropagation = (evt: any) => {
    handleDeleteUser(user.name);
    evt.stopPropagation();
  };

  const handleOpenSettings = (evt: any) => {
    evt.stopPropagation();
    setIsSettingsOpen(true);
  };

  const placementColorClass =
    user.placement === "1st"
      ? "bg-theta"
      : user.placement === "2nd"
      ? "bg-pi"
      : user.placement === "3rd"
      ? "bg-phi"
      : "bg-epsilon";

  return (
    <>
      <UserSettings
        onClose={() => setIsSettingsOpen(false)}
        isOpen={isSettingsOpen}
        user={user}
      />
      <div className='d-flex align-items-center justify-content-center gap-4'>
        {/* card */}
        <div
          className={
            "user-card-55bb d-flex align-items-center justify-content-center bg-gamma rounded p-4 mb-4 w-100 "
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
            <img src={user.avatar} alt={user.name} className='d-block mb-2' />
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
            <p>
              <b className='color-phi'>Badges:</b> {user.badges.length}
            </p>
          </div>

          {/* actions */}
          <div className='user-card-55bb_actions d-flex align-items-center justify-content-center flex-column flex-shrink-0'>
            <div className='flex-grow-1 bg-zeta d-flex align-items-center justify-content-center '>
              <button
                onClick={handleViewUser}
                className='w-100 color-alpha bg-nu d-flex align-items-center justify-content-center'
              >
                <span>View</span>
              </button>
            </div>
            <div className='flex-grow-1 bg-delta'>
              <button
                className='bg-nu color-alpha d-flex align-items-center justify-content-center p-2'
                onClick={handleOpenSettings}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
        <button
          className='color-danger flex-shrink-0 bg-nu p-2'
          onClick={handleDeleteUserAndStopPropagation}
        >
          <ion-icon name='trash-outline' />
        </button>
      </div>
    </>
  );
};
