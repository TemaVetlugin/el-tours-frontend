import React from "react";
import { observer } from "mobx-react";

import { UiIcon, UiLink } from "shared/uikit";

import './index.scss';
import { COLORS } from "shared/contants";

type PropsType = {
    href: string,
    label: string,
    isForward?: boolean
}

export const CLinkButton = observer(({ href, label, isForward }: PropsType) => {
    return (
        <UiLink href={href} className="c-back-button">
            {!isForward && (
                <UiIcon
                    size={16}
                    name="chevronLeft"
                    color={COLORS.PRIMARY}
                />
            )}<span>{label}</span>{isForward && '⟶'}
        </UiLink>
    )
});
