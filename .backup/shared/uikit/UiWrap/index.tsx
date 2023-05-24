import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    className?: string
}

export const UiWrap = observer(({ children, className }: PropsType) => {
    const classNames = classnames('ui-wrap', className);
    return (
        <div className={classNames}>
            {children}
        </div>
    )
})
