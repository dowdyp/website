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

type LibraryItemProps = {
    src: SvgElement,
    href: string,
    title: string,
}

const LibraryAnchor = (props: LibraryItemProps) => {
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
    libraries: LibraryItemProps[];
}

export type ExpItem = {
    image: ImageSrc,
    alt: string,
    company: string,
    title: string,
    technologies: LibraryItemProps[]
} & ExpSEProps;

export const ExperienceItem = (props: {
    item: ExpItem
}) => (
    <div className="exp-item">
        <div className="exp-item-heading">
            <div className="exp-job-info">
                <img alt={props.item.alt} src={props.item.image} />
                <div>
                    <h4 className="title">{props.item.title}</h4>
                    <span className="company">{props.item.company}</span>
                </div>
            </div>
            <div className="exp-timeframe">
                <ExperienceStartAndEnd startDate={props.item.startDate} endDate={props.item.endDate} />
            </div>
        </div>
        <div className="exp-libs">
            {props.item.technologies.map((lib) => <LibraryAnchor key={lib.title} {...lib} />)}
        </div>
    </div>
)