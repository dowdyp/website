import { BulletPointProps, ExperienceItem, ExpItem } from "./ExperienceItem"
import blLogo from "@static/bondlink-logo.png"
import reactLogo from "@svgs/react-logo.svg";
import typescriptLogo from "@svgs/typescript-logo.svg";
import effectTsLogo from "@svgs/effect-ts.svg";
import jodaLogo from "@svgs/joda.svg";
import victoryLogo from "@svgs/victory-charts.svg"

const bullets: BulletPointProps[] = [
    {
        description: `Lead a migration to JS-Joda to fix date arithmetic issues for data aggregations within charts, as well as and timezone parsing consistency for multi-national users`,
        libraries: [{
            src: jodaLogo,
            href: "https://github.com/js-joda/js-joda",
            title: "JS-Joda"
        }]
    },
    {
        description: `Developed a data visualization library built on VictoryCharts, decreasing boilerplate for new features to improve engineering throughput`,
        libraries: [{
            src: victoryLogo,
            href: "https://commerce.nearform.com/open-source/victory/",
            title: "Victory"
        }]
    }
]

const experience: ReadonlyArray<ExpItem> = [{
    image: blLogo,
    alt: "BondLink Logo",
    company: "BondLink, Inc.",
    title: "Software Engineer II",
    startDate: new Date(2022, 4, 20),
    endDate: new Date(2024, 8, 20),
    bullets: bullets,
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
    }]
}]

export const Experience = () => {
    return <div className="experience">
        <h2>Experience</h2>
        <div className="experience-shadow">
            <div className="experience-list">
                {experience.map((exp) => <ExperienceItem key={exp.company} item={exp} />)}
            </div>
        </div>
    </div>
}