import { BattleContextProvider } from "@context";
import { Layout } from "./Layout/Layout";

export const ViewBattleGround = () => {
  return (
    <BattleContextProvider>
      <Layout />
    </BattleContextProvider>
  );
};
