import { Outlet } from "react-router-dom"
import { TitleCard } from "../titlecard/TitleCard"
import { NavigationLink } from "../NavLink"
import { routes } from "../../../router/Router"

export const HomepageChrome = () => {
    return <div className="homepage-chrome">
        <div className="homepage-container">
            <TitleCard />
            <div className="homepage-content">
                <NavigationLink text={"Experience"} route={routes.experience} />
                <Outlet />
            </div>
        </div>
        <footer>
            this is a footer
        </footer>
    </div>
}