import { Outlet } from "react-router-dom"
import { TitleCard } from "../titlecard/TitleCard"
import { NavigationLink } from "../NavLink"
import { routes } from "../../../router/Router"
import { Footer } from "./Footer"

export const HomepageChrome = () => {
    return <div className="homepage-chrome">
        <div className="homepage-container">
            <TitleCard showProperties />
            <div className="homepage-content">
                <div className="navlinks">
                    <NavigationLink text={"Experience"} route={routes.experience} />
                    <NavigationLink text={"Ramblings"} route={routes.ramblings} />
                    <NavigationLink text={"Data Stuff"} route={routes.plinko} />
                </div>
                <Outlet />
            </div>
        </div>
        <Footer />
    </div>
}