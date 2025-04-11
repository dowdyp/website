const links = [{
  title: "Linear Regression, a reintroduction",
  shortContent: "I recently decided to re-approach concepts first introduced to me in my machine learning course at WIT. With ML being all the rage in current days, while I won't become a veteran statistician overnight, I figured it'd be best to at least brush up on some of these topics."
}]

export const Ramblings = () => {
    return (
      <div className="publication-card-container">
        {links.map(({ title, shortContent }) => <div className={"publication-card"}>
          <h3>{title}</h3>
          <p className={"trunc-desc"}>
            {shortContent}
          </p>
        </div>)}
      </div>
    )
}