import { NavLink } from "react-router-dom"
import { ValidRoutes } from "../../router/Router"

import Chevrons from "@svgs/chevrons.svg"

export const NavigationLink = (props: {
    text: string;
    route: ValidRoutes,
}) => <div className="navlink">
    <NavLink to={props.route}>
        <span className="navlink-text">{props.text}</span>
        <Chevrons />
    </NavLink>
</div>