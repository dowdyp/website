import { SvgAnchor } from "@react/components/SvgElem";
import Bullet from "@svgs/bullet.svg";

type ExpSEProps = {
    startDate: Date,
    endDate: Date,
}

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"] as const;
const getMonthName = (d: Date) => shortMonths[d.getMonth()];

const ExperienceStartAndEnd = (props: ExpSEProps) => 
    <span className="start-and-end">{getMonthName(props.startDate)} {props.startDate.getFullYear()} to {getMonthName(props.endDate)} {props.endDate.getFullYear()}</span>

type TechIconWithRoute = {
    src: SvgElement,
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

type BulletTechItemProps = {
    src: SvgElement,
    href: string,
    title: string,
}
const LibraryAnchor = (props: BulletTechItemProps) => {
    return <a 
        href={props.href} 
        target="_blank" 
        aria-labelledby={props.title} 
        title={props.title}
    >
        <props.src 
            aria-label={props.title} 
            title={props.title} 
            width={20} 
            height={20} 
        />
        <p className="description">{props.title}</p>
    </a>
}

export type BulletPointProps = {
    description: string;
    libraries: BulletTechItemProps[];
}
const BulletPoint = (props: BulletPointProps) => (
    <div className="content">
        <div className="icon">
            <Bullet width={12} height={12} />
        </div>
        <span>{props.description}</span>
        <div className="libraries">
            {props.libraries.map((lib) => <LibraryAnchor key={lib.title} {...lib} />)}
        </div>
    </div>
)

export type ExpItem = {
    image: ImageSrc,
    alt: string,
    company: string,
    title: string,
    bullets: BulletPointProps[],
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
                {props.item.technologies.map((t) => <Technology key={t.title} {...t} />)}
            </div>
        </div>
        <div className="exp-bullets">
            {props.item.bullets.map((b) => <BulletPoint key={b.description} {...b}/>)}
        </div>
    </div>
)