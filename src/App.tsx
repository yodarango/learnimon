import { MainLayout } from "./components/MainLayout/MainLayout";
import { ROUTE_HOME } from "@constants";
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
      <Route path={ROUTE_HOME} element={<ViewIndex />} />
      {/* <Route
        path={ROUTE_HOME}
        element={
          <MainLayout>
            <ViewIndex />
          </MainLayout>
        }
      /> */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
