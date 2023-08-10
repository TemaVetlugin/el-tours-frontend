'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { CCatalog } from "shared/components/catalog";
import { useSearchParams } from "shared/hooks";

export const PSearchCatalogProducts = observer(() => {
    const searchParams = useSearchParams({
        page: 1,
        query: ''
    })

    if (!searchParams.query) {
        return null;
    }

    return (
        <CCatalog
            params={{
                query: searchParams.query,
            }}
        />
    )
});
