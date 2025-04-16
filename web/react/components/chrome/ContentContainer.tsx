import { PropsWithChildren } from "react";

export const ContentContainer = (props: PropsWithChildren<{}>) => {
    return <div className={"content-container"}>
        {props.children}
    </div>
}