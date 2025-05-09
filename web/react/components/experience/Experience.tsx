import { BulletPointProps, ExperienceItem, ExpItem } from "./ExperienceItem"
import blLogo from "@static/bondlink-logo.png"
import reactLogo from "@svgs/react-logo.svg";
import typescriptLogo from "@svgs/typescript-logo.svg";
import effectTsLogo from "@svgs/effect-ts.svg";
import jodaLogo from "@svgs/joda.svg";
import victoryLogo from "@svgs/victory-charts.svg"

const experience: ReadonlyArray<ExpItem> = [{
    image: blLogo,
    alt: "BondLink Logo",
    company: "BondLink",
    title: "Software Engineer II",
    startDate: new Date(2022, 4, 20),
    endDate: new Date(2024, 8, 20),
    technologies: [{
        src: reactLogo,
        title: "React",
        href: "https://react.dev/",
    }, {
        src: typescriptLogo,
        title: "Typescript",
        href: "https://www.typescriptlang.org/"
    }, {
        src: effectTsLogo,
        title: "Effect-TS",
        href: "https://effect.website/"
    }, {
        src: victoryLogo,
        href: "https://commerce.nearform.com/open-source/victory/",
        title: "Victory"
    }, {
        src: jodaLogo,
        href: "https://github.com/js-joda/js-joda",
        title: "js-joda"
    }]
}]

export const Experience = () => {
    return <div className="experience">
        <div className="experience-shadow">
            <div className="experience-list">
                {experience.map((exp) => <ExperienceItem key={exp.company} item={exp} />)}
            </div>
        </div>
    </div>
}