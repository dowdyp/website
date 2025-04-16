import { Experience } from "@react/components/experience/Experience"
import { HomepageChrome } from "@react/components/chrome/HomepageChrome"
import { BrowserRouter, Route, Routes as RouteBlock } from "react-router-dom"
import { FourOhFour } from "@react/components/chrome/404";
import { Ramblings } from "@react/pages/Ramblings";
import { Data } from "@react/pages/DataStuff/Data";

export const routes = {
  experience: "/",
  ramblings: "/ramblings",
  plinko: "/data",
  roulette: "/roulette",
  wildcard: "*",
} as const;

type Routes = typeof routes;
export type ValidRoutes = Routes[keyof Routes];

export const Router = () => {
    return <BrowserRouter>
      <RouteBlock>
        <Route element={<HomepageChrome />}>
          <Route path={routes.experience} element={<Experience />} />
          <Route path={routes.ramblings} element={<Ramblings />} />
          <Route path={routes.plinko} element={<Data />} />
        </Route>
        <Route path={routes.wildcard} element={<FourOhFour />} />
      </RouteBlock>
    </BrowserRouter>
  }