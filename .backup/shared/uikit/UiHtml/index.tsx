import React from "react";
import { observer } from "mobx-react";
import parse from 'html-react-parser';
import classnames from "classnames";

import './index.scss';

type PropsType = {
    value?: string | null,
    className?: string,
}

export const UiHtml = observer(({ value, className }: PropsType) => {
    if (!value) {
        return null;
    }
    const classNames = classnames('ui-html', className);
    return (
        <div className={classNames}>
            {parse(value)}
        </div>
    )
});
