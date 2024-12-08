import { Experience } from "@react/components/experience/Experience"
import { HomepageChrome } from "@react/components/chrome/HomepageChrome"
import { BrowserRouter, Route, Routes as RouteBlock } from "react-router-dom"
import { FourOhFour } from "@react/components/chrome/404";

export const routes = {
  experience: "/",
  publications: "/publications",
  plinko: "/plinko",
  wildcard: "*",
} as const;

type Routes = typeof routes;
export type ValidRoutes = Routes[keyof Routes];

export const Router = () => {
    return <BrowserRouter>
      <RouteBlock>
        <Route element={<HomepageChrome />}>
          <Route path={routes.experience} element={<Experience />} />
          {/* <Route path={routes.publications} element={<Experience />} />
          <Route path={routes.plinko} element={<Experience />} /> */}
        </Route>
        <Route path={routes.wildcard} element={<FourOhFour />} />
      </RouteBlock>
    </BrowserRouter>
  }