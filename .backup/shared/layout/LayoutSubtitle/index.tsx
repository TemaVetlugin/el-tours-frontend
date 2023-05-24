import React from "react";
import { observer } from "mobx-react";

import './index.scss';

type PropsType = {
    children?: React.ReactNode
}

export const LayoutSubtitle = observer(({ children }: PropsType) => {
    return (
        <div className='layout-subtitle'>
            {children}
        </div>
    )
})
