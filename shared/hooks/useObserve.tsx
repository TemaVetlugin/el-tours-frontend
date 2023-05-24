import React, { ReactElement } from "react";
import { Observer } from "mobx-react-lite";

export const useObserve = (render: () => ReactElement) => {
    return (
        <Observer render={render}/>
    )
}
