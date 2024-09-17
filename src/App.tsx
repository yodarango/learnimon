import {
  ROUTE_HOME,
  ROUTE_BATTLE,
  ROUTE_HOME_CHALLENGES,
  ROUTE_HOME_USERS_SINGLE,
  ROUTE_HOME_USERS,
} from "@constants";
import { BattleContextProvider } from "@context";
import { ViewBattleGround, ViewChallenges, ViewUsersId } from "@views/index";
import { ViewIndex } from "@views/index";

import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={""} errorElement={<></>}>
      <Route path={ROUTE_HOME_CHALLENGES} element={<ViewChallenges />} />
      <Route path={ROUTE_BATTLE} element={<ViewBattleGround />} />
      <Route path={ROUTE_HOME_USERS_SINGLE} element={<ViewUsersId />} />
      <Route path={ROUTE_HOME} element={<ViewIndex />} />
      <Route path={ROUTE_HOME_USERS} element={<ViewIndex />} />
    </Route>
  )
);

function App() {
  return (
    <BattleContextProvider>
      <RouterProvider router={router} />
    </BattleContextProvider>
  );
}

export default App;
