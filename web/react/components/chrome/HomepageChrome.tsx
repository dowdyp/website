import { Outlet } from "react-router-dom"
import { TitleCard } from "../titlecard/TitleCard"
import { NavigationLink } from "../NavLink"
import { routes } from "../../../router/Router"

export const HomepageChrome = () => {
    return <div className="homepage-chrome">
        <div className="homepage-container">
            <TitleCard showProperties />
            <div className="homepage-content">
                <div className="navlinks">
                    <NavigationLink text={"Experience"} route={routes.experience} />
                    <NavigationLink text={"Publications"} route={routes.publications} />
                    <NavigationLink text={"Plinko"} route={routes.plinko} />
                </div>
                <Outlet />
            </div>
        </div>
        <footer>
            this is a footer
        </footer>
    </div>
}