import { generatePath, useNavigate } from "react-router-dom";
import { getLocalStorageUsers } from "@utils";
import { ROUTE_BATTLE } from "@constants";
import { useEffect, useState } from "react";
import { useBattleContext } from "@context";

export const useLayout = () => {
  const ctx = useBattleContext();
  const navigate = useNavigate();

  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [isToasterOpen, setIsToasterOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    const users = getLocalStorageUsers();
    setUsers(users);
  }, []);

  const handleAddNewUser = () => {
    if (formData.name && formData.avatar) {
      const newUsers = [...users, { ...formData, pokemons: [], score: 0 }];
      setUsers(newUsers);
      localStorage.setItem("learnimon__users", JSON.stringify(newUsers));
      setFormData({ name: "", avatar: "" });
    } else {
      setIsToasterOpen(true);
    }
  };

  const handleDeleteUser = (userName: string) => {
    const newUsers = users.filter((u) => u.name !== userName);
    setUsers(newUsers);
    localStorage.setItem("learnimon__users", JSON.stringify(newUsers));
  };

  const handleSelectUserAndBattle = (user: Record<string, any>) => {
    const userBattlePath = generatePath(ROUTE_BATTLE, {
      name: String(user.name).replace(/\s/g, "-"),
    });

    // set the selected user
    ctx.handleSelectUser(user.name);

    navigate(userBattlePath);
  };

  return {
    handleSelectUserAndBattle,
    handleAddNewUser,
    handleDeleteUser,
    setIsToasterOpen,
    isToasterOpen,
    setFormData,
    formData,
    users,
  };
};
