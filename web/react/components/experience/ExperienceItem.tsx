import { SvgAnchor } from "@react/components/SvgElem";

type ExpSEProps = {
    startDate: Date,
    endDate: Date,
}

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"] as const;
const getMonthName = (d: Date) => shortMonths[d.getMonth()];

const ExperienceStartAndEnd = (props: ExpSEProps) => 
    <span className="start-and-end">{getMonthName(props.startDate)} {props.startDate.getFullYear()} to {getMonthName(props.endDate)} {props.endDate.getFullYear()}</span>

type TechIconWithRoute = {
    src: SVGString,
    href: string;
    title: string;
}

const Technology = (props: TechIconWithRoute) => (
    <SvgAnchor
        size="md" 
        target="_blank"
        {...props}
    />
)

export type ExpItem = {
    image: ImageSrc,
    alt: string,
    company: string,
    title: string,
    bullets: string[],
    technologies: TechIconWithRoute[]
} & ExpSEProps;

export const ExperienceItem = (props: {
    item: ExpItem
}) => (
    <div className="exp-item">
        <div className="exp-item-heading">
            <div className="exp-job-info">
                <img src={props.item.image} />
                <div>
                    <h4 className="title">{props.item.title}</h4>
                    <ExperienceStartAndEnd startDate={props.item.startDate} endDate={props.item.endDate} />
                </div>
            </div>
            <div className="exp-technologies">
                {props.item.technologies.map((t) => <Technology {...t} />)}
            </div>
        </div>
        <div className="exp-bullets">
            {props.item.bullets.map((b) => b)}
        </div>
    </div>
)