import React from "react";
import classnames from "classnames";
import { observer } from "mobx-react";

import './index.scss';

type PropsType = {
    value: string | number,
    className?: string
}

export const UiTextValue = observer(({ value, className }: PropsType) => {
    return (
        <div className={classnames('ui-text-value', className)}>
            {value}
        </div>
    );
});
