'use client';

import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import { CatalogFilterModel } from "shared/models";

import './index.scss';

type PropsType = {
    catalogFilters: CatalogFilterModel[],
}

export const CCatalogActiveFilters = observer(({ catalogFilters = [] }: PropsType) => {
    return (
        <div className="c-catalog-active-filters">
            {catalogFilters.map(catalogFilter => {
                if (!catalogFilter.value) {
                    return null;
                }
                const catalogFilterValue = toJS(catalogFilter.value);
                let values: any[] = Array.isArray(catalogFilterValue) ? catalogFilterValue : [catalogFilterValue];

                return values.map(value => {
                    const item = catalogFilter.items.find(item => item.id == value);
                    if (!item) {
                        return null;
                    }
                    return (
                        <div
                            key={catalogFilter.name + value}
                            className="c-catalog-active-filters__item"
                        >
                            {item.name}
                        </div>
                    )
                });
            })}
        </div>
    )
});
