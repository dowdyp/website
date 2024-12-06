import { ExperienceItem, ExpItem } from "./ExperienceItem"
import blLogo from "@static/bondlink-logo.png"
import reactLogo from "@svgs/react-logo.svg";
import typescript from "@svgs/typescript-logo.svg";
import fptsLogo from "@svgs/fp-ts-logo.svg"

const experience: ReadonlyArray<ExpItem> = [{
    image: blLogo,
    alt: "BondLink Logo",
    company: "BondLink, Inc.",
    title: "Software Engineer II",
    startDate: new Date(2022, 4, 20),
    endDate: new Date(2024, 8, 20),
    bullets: [],
    technologies: [{
        src: reactLogo,
        title: "React",
        href: "https://react.dev/",
    }, {
        src: typescript,
        title: "Typescript",
        href: "https://www.typescriptlang.org/"
    }, {
        src: fptsLogo,
        title: "FP-TS",
        href: "https://github.com/gcanti/fp-ts"
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