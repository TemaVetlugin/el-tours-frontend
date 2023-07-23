'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
}

export const Description = observer(({ children }: PropsType) => {
    return <div className={'ui-panel-description'}>{children}</div>;
});
