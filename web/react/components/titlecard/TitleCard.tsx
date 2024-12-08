import { TitleProperty } from "./TitleProperty";

import location from "@svgs/location.svg";
import mail from "@svgs/mail.svg";
import github from "@svgs/github.svg";
import HeroUnderline from "@svgs/hero-underline.svg"

export const TitleCard = (props: {
    showProperties?: true,
}) => {
    return <div className="title-card-container" itemScope itemType="https://schema.org/Person">
        <div className="name-container">
            <h2 itemProp="name">
                <span itemProp="givenName">Parker</span> <span itemProp="familyName">Dowdy</span>
            </h2>
            <HeroUnderline />
        </div>
        {props.showProperties && <div className="title-property-container">
            <TitleProperty icon={location} label={"South Portland, ME"} schema="homeLocation"/>
            <TitleProperty icon={mail} label={"parker@dowdyp.net"} schema="email"/>
            <TitleProperty icon={github} label={"dowdyp"} />
        </div>}
    </div>
}