import React, { HTMLProps, useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem } from "@mui/base";
import { useBattleContext } from "@context";
import { ROUTE_BATTLE } from "@constants";
import { Dropdown, Thumbnail } from "@ds";

// styles
import "./Settings.scss";

export const Settings: React.FC<HTMLProps<HTMLDivElement>> = () => {
  const { state, handleResetContext } = useBattleContext();
  const { selectedUser } = state;

  const navigate = useNavigate();

  const [users, setUsers] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const users = localStorage.getItem("learnimon__users");
    if (users) {
      setUsers(JSON.parse(users));
    }
  }, []);

  const handleSelectUser = (user: Record<string, any>) => {
    location.href = location.href.replace(/\/[^/]+$/, `/${user.name}`);
    // TODO: This is not working 👇 FIX

    // handleResetContext();
    // const userBattlePath = generatePath(ROUTE_BATTLE, {
    //   name: String(user.name).replace(/\s/g, "-"),
    // });
    // navigate(userBattlePath);
  };

  return (
    <div className='settings-20mn'>
      <Dropdown>
        <MenuButton className='bg-nu p-0'>
          <Thumbnail
            src={selectedUser?.avatar}
            alt='selected user avatar'
            className='settings-20mn__avatar'
          />
        </MenuButton>

        <Menu style={{ zIndex: 13 }} className='bg-beta'>
          {users.map((user, i) => (
            <MenuItem
              key={user.name + String(i)}
              onClick={() => handleSelectUser(user)}
            >
              <div className='d-flex align-items-center justify-content-start gap-2 p-4'>
                <Thumbnail
                  src={user.avatar}
                  alt='user avatar'
                  className='settings-20mn__avatar'
                />
                <p>{user.name}</p>
              </div>
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    </div>
  );
};
