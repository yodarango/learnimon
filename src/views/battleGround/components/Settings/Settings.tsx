import React, { HTMLProps, useEffect } from "react";
import { useBattleContext } from "@context";
import { Drawer } from "@components";

// styles
import "./Settings.scss";

export const Settings: React.FC<HTMLProps<HTMLDivElement>> = () => {
  const { handleSelectUser, state } = useBattleContext();
  const { selectedUser } = state;

  const [users, setUsers] = React.useState<Record<string, any>[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const users = localStorage.getItem("learnimon__users");
    if (users) {
      setUsers(JSON.parse(users));
    }
  }, []);

  return (
    <div className='settings-20mn'>
      <button onClick={handleToggleDrawer} className='bg-nu color-alpha'>
        <ion-icon name='settings-outline' className='settings-outline' />
      </button>
      <Drawer isOpen={isOpen} onClose={handleToggleDrawer}>
        <h3 className='mb-6'>Players 🎮</h3>
        <div className='settings-20mn__users'>
          {users.map((user, index) => (
            <div
              key={index}
              className={
                "settings-20mn__user d-flex align-items-center flex-column justify-content-center bg-gamma rounded p-4 " +
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
          ))}
        </div>
      </Drawer>
    </div>
  );
};
