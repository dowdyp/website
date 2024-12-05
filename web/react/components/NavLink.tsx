import { NavLink } from "react-router-dom"
import { ValidRoutes } from "../../router/Router"
import { Svg } from "@svgs/SvgElem";

import chevrons from "@svgs/chevrons.svg"

export const NavigationLink = (props: {
    text: string;
    route: ValidRoutes,
}) => <div className="navlink">
    <NavLink to={props.route}>
        <span className="navlink-text">{props.text}</span>
        <Svg src={chevrons} />
    </NavLink>
</div>