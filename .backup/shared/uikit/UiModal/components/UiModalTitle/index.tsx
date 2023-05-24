import React from "react";
import { observer } from "mobx-react";

import './index.scss';

type PropsType = {
    value?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode
}

export const UiModalTitle = observer(({ value, style, children }: PropsType) => {
    return (
        <div className="ui-modal-title" style={style}>
            {value}
            {children}
        </div>
    )
})
