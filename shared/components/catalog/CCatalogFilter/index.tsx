'use client';

import React, { useEffect } from "react";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";

import { UiSkeleton } from "shared/ui";
import { CatalogFilterModel } from "shared/models";
import { useNavigate, useObservable, useSearchParams } from "shared/hooks";

import { CCatalogFilterItem } from "./components/CCatalogFilterItem";

import './index.scss';

type PropsType = {
    isLoading: boolean
    catalogFilters: CatalogFilterModel[],
}

export const CCatalogFilter = observer(({ catalogFilters = [], isLoading }: PropsType) => {
    const navigate = useNavigate();
    const params = useSearchParams({});
    const store = useObservable({
        isOpened: false
    });
    useEffect(() => {
        if (!params) {
            return;
        }
        catalogFilters.forEach(catalogFilter => {
            if (params.hasOwnProperty(catalogFilter.code)) {
                catalogFilter.update({
                    isOpened: true
                });
                catalogFilter.setValue(params[catalogFilter.code]);
                return;
            }
            catalogFilter.update({
                value: null
            })

        });
    }, [catalogFilters, params])

    const handleSubmit = () => {
        const query = {
            ...params,
        };
        delete query['page'];

        catalogFilters.forEach(catalogFilter => {
            delete query[catalogFilter.name];
            delete query[catalogFilter.code];
            if (catalogFilter.value) {
                query[catalogFilter.name] = catalogFilter.value;
            }
        });

        navigate(null, query, true);
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