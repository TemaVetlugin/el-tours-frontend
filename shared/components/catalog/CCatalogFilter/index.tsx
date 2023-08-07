'use client';

import React, { useEffect } from "react";
import classnames from "classnames";
import { observer } from "mobx-react-lite";

import { UiSkeleton } from "shared/ui";
import { CatalogFilterModel } from "shared/models";
import { useStore, useRouter, useSearchParams } from "shared/hooks";

import { CCatalogFilterItem } from "./components/CCatalogFilterItem";

import './index.scss';

type PropsType = {
    isLoading: boolean
    catalogFilters: CatalogFilterModel[],
}

export const CCatalogFilter = observer(({ catalogFilters = [], isLoading }: PropsType) => {
    const router = useRouter();
    const searchParams = useSearchParams({});
    const store = useStore({
        isOpened: false
    });
    useEffect(() => {
        if (!searchParams) {
            return;
        }
        catalogFilters.forEach(catalogFilter => {
            if (searchParams.hasOwnProperty(catalogFilter.code)) {
                catalogFilter.update({
                    isOpened: true
                });
                catalogFilter.setValue(searchParams[catalogFilter.code]);
                return;
            }
            catalogFilter.update({
                value: null
            })

        });
    }, [catalogFilters, searchParams])

    const handleSubmit = () => {
        const query = {
            ...searchParams,
        };
        delete query['page'];

        catalogFilters.forEach(catalogFilter => {
            delete query[catalogFilter.name];
            delete query[catalogFilter.code];
            if (catalogFilter.value) {
                query[catalogFilter.name] = catalogFilter.value;
            }
        });

        router.replace(null, query);
        store.set("isOpened", false);
    }

    return (
        <div className={classnames('c-catalog-filter', {
            'c-catalog-filter--opened': store.isOpened
        })}>
            {isLoading && Array.from(Array(4).keys()).map((item) => (
                <UiSkeleton key={item} className={'c-catalog-filter__skeleton'}/>
            ))}
            {!isLoading && catalogFilters.map(catalogFilter => (
                <CCatalogFilterItem
                    key={catalogFilter.name}
                    catalogFilter={catalogFilter}
                    onChange={({ value }) => {
                        catalogFilter.update({ value });
                        handleSubmit();
                    }}
                />
            ))}
        </div>
    )
});
