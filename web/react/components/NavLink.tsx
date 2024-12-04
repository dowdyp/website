import { NavLink } from "react-router-dom"
import { ValidRoutes } from "../../router/Router"
import { Svg } from "@svgs/SvgElem";

import chevrons from "@svgs/chevrons.svg"

export const NavigationLink = (props: {
    text: string;
    route: ValidRoutes,
}) => {
    return <NavLink className="navlink" to={props.route}>{props.text} <Svg src={chevrons}/></NavLink>
}