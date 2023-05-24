import React from "react";
import { observer } from "mobx-react";

import { LayoutError } from "../LayoutError";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
}

export const LayoutBody = observer((
    {
        children,
    }: PropsType
) => {
    return (
        <LayoutError>
            <div className='layout-body'>
                {children}
            </div>
        </LayoutError>
    )
})

