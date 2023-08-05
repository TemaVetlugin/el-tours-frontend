'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { CCatalog } from "shared/components/catalog";

type PropsType = {
    query?: string,
}

export const PSearchCatalogProducts = observer(({ query }: PropsType) => {
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
