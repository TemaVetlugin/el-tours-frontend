import React from "react";
import { observer } from "mobx-react";

import './index.scss';

type PropsType = {
    value?: string,
    badge?: string | number | null
}

export const LayoutTitle = observer(({ value = 'Страница', badge }: PropsType) => {
    return (
        <div className='layout-title'>
            <h1 className='layout-title__value'>{value}</h1>
            {!!badge && <div className="layout-title__badge">{badge}</div>}
        </div>
    )
})

