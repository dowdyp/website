import { NavLink } from "react-router-dom"
import { ValidRoutes } from "../../router/Router"

export const NavigationLink = (props: {
    text: string;
    route: ValidRoutes,
}) => (
    <NavLink to={props.route}>
      <div className="navlink">
        <span className="navlink-text">{props.text}</span>
      </div>
    </NavLink>
)