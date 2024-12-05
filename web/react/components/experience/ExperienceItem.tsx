type ExpSEProps = {
    startDate: Date,
    endDate: Date,
}

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"] as const;
const getMonthName = (d: Date) => shortMonths[d.getMonth()];

const ExperienceStartAndEnd = (props: ExpSEProps) => 
    <span className="start-and-end">{getMonthName(props.startDate)} {props.startDate.getFullYear()} to {getMonthName(props.endDate)} {props.endDate.getFullYear()}</span>

export type ExpItem = {
    image: ImageSrc,
    alt: string,
    title: string,
    bullets: string[],
} & ExpSEProps;

export const ExperienceItem = (props: {
    item: ExpItem
}) => (
    <div className="exp-item">
        <div className="exp-job-info">
            <img src={props.item.image} />
            <div>
                <h4 className="title">{props.item.title}</h4>
                <ExperienceStartAndEnd startDate={props.item.startDate} endDate={props.item.endDate} />
            </div>
        </div>
        <div className="exp-bullets">
            {props.item.bullets.map((b) => b)}
        </div>
    </div>
)