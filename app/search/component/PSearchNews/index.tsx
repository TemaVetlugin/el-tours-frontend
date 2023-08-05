'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { CCatalog } from "shared/components/catalog";

type PropsType = {
    query?: string,
}

export const PSearchNews = observer(({ query }: PropsType) => {
    if (!query) {
        return null;
    }
    return (
        <CCatalog
            params={{
                query,
                apply: ['query']
            }}
        />
    )
});
