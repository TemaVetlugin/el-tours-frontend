import React from "react";
import { observer } from "mobx-react";

import './index.scss';

type PropsType = {
    value?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode
}

export const UiModalDescription = observer(({ value, style, children }: PropsType) => {
    if (!value) {
        return null;
    }
    return (
        <div className="ui-modal-description" style={style}>
            {value}
            {children}
        </div>
    )
})
