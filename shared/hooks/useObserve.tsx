import React, { ReactElement } from "react";
import { Observer } from "mobx-react-lite";

export function useObserve(render: () => ReactElement) {
    return (
        <Observer render={render}/>
    )
}
