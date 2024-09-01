import { BattleContextProvider } from "@context";
import { Layout } from "./Layout/Layout";

export const ViewIndex = () => {
  return (
    <BattleContextProvider>
      <Layout />
    </BattleContextProvider>
  );
};
