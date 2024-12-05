import { ExperienceItem, ExpItem } from "./ExperienceItem"
import blLogo from "@static/bondlink-logo.png"

const experience: ReadonlyArray<ExpItem> = [{
    image: blLogo,
    alt: "BondLink Logo",
    title: "Software Engineer II",
    startDate: new Date(2022, 4, 20),
    endDate: new Date(2024, 8, 20),
    bullets: []
}]

export const Experience = () => {
    return <div className="experience">
        <h2>Experience</h2>
        <div className="experience-shadow">
            <div className="experience-list">
                {experience.map((exp) => <ExperienceItem item={exp} />)}
            </div>
        </div>
    </div>
}