'use client';

import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import { CatalogFilterModel } from "shared/models";
import { UiIcon } from "shared/ui";
import { useRouter, useSearchParams } from "shared/hooks";

import './index.scss';

type PropsType = {
    catalogFilters: CatalogFilterModel[],
}

export const CCatalogHeader = observer(({ catalogFilters = [] }: PropsType) => {
    const router = useRouter();
    const hasActiveFilters = catalogFilters.some(catalogFilter => !!catalogFilter.value);
    const searchParams = useSearchParams({});

    const handleRemoveFilter = (catalogFilter: CatalogFilterModel, removeValue: number | string) => {
        const query = {
            ...searchParams,
        };
        delete query['page'];
        delete query[catalogFilter.name];
        delete query[catalogFilter.code];

        if (Array.isArray(toJS(catalogFilter.value))) {
            const value = catalogFilter.value.filter((v: any) => v != removeValue);
            if (value.length > 0) {
                query[catalogFilter.name] = value;
            }
        }

        router.replace(null, query);
    }

    return (
        <div className="c-catalog-header">
            <div className="c-catalog-header__filters">
                {hasActiveFilters && (
                    <div className="c-catalog-header__clear">
                        <span>Сбросить фильтры</span>
                        <i onClick={() => {
                            router.replace(null, {});
                        }}>
                            <UiIcon size={8} name={"close"}/>
                        </i>
                    </div>
                )}
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
                                className="c-catalog-header__filter"
                            >
                                <span>
                                    {item.name}
                                </span>
                                <i onClick={() => {
                                    handleRemoveFilter(catalogFilter, value);
                                }}>
                                    <UiIcon size={8} name={"close"}/>
                                </i>
                            </div>
                        )
                    });
                })}
            </div>
            <div className="c-catalog-header__sort">

            </div>
        </div>
    )
});
