'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import './index.scss';

type PropsType = {
    value?: string,
}

export const Title = observer(({ value }: PropsType) => {
    return (
        <div className="ui-page-title">
            {value}
        </div>
    )
})
