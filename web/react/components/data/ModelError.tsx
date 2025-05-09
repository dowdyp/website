import { WithErrorAndWarning } from "@ml/LinearRegression"

export const ModelErrorAndWarning = (props: {
    model: WithErrorAndWarning
}) => <>
    {props.model.errorMessage && <div className="model-status model-status__error">{props.model.errorMessage}</div>}
    {props.model.warningMessage && <div className="model-status model-status__warning">{props.model.warningMessage}</div>}
</>