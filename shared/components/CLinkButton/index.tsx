import React from "react";
import { observer } from "mobx-react";

import { UiLink } from "shared/uikit";

import './index.scss';

type PropsType = {
    href: string,
    label: string,
    isForward?: boolean
}

export const CLinkButton = observer(({ href, label, isForward }: PropsType) => {
    return (
        <UiLink href={href} className="c-back-button">
            {!isForward && '⟵'}<span>{label}</span>{isForward && '⟶'}
        </UiLink>
    )
});
