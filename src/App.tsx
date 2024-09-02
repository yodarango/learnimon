import { ROUTE_HOME, ROUTE_BATTLE } from "@constants";
import { ViewBattleGround } from "@views/index";
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
      <Route path={ROUTE_BATTLE} element={<ViewBattleGround />} />
      <Route path={ROUTE_HOME} element={<ViewIndex />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
