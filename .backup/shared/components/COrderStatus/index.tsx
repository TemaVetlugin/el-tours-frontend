import React from "react";
import { observer } from "mobx-react";

import './index.scss';

type PropsType = {
    style?: React.CSSProperties,
    label?: string
}

export const COrderStatus = observer(({ label, style }: PropsType) => {
    return (
        <div className="c-order-status" style={style}>
            {label}
        </div>
    )
});
