'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { UiCheckbox, UiChecklist, UiDropdown } from "shared/ui";
import { CatalogFilterModel } from "shared/models";
import { ChangeHandlerType } from "shared/types";
import { useNavigate, useSearchParams } from "shared/hooks";

import './index.scss';

type PropsType = {
    catalogFilters?: CatalogFilterModel[],
}

export const CCatalogHeader = observer(({ catalogFilters = [] }: PropsType) => {
    const navigate = useNavigate();
    const searchParams = useSearchParams({
        sort: 'name_asc'
    });

    useEffect(() => {
        if (!searchParams) {
            return;
        }
        catalogFilters.forEach(catalogFilter => {
            if (searchParams[catalogFilter.name]) {
                catalogFilter.setValue(searchParams[catalogFilter.name]);
            }
        });
    }, [catalogFilters, searchParams])

    const handleChangeFilter: (catalogFilter: CatalogFilterModel) => ChangeHandlerType<any> = (catalogFilter) => (
        {
            name,
            value
        }
    ) => {
        catalogFilter.update({ value });

        const params = {
            ...searchParams,
            [name]: value
        };
        if (!value) {
            delete params[name];
        }
        navigate(null, params);
    }
    const handleChangeDropdown: (defaultValue: number | string) => ChangeHandlerType<any> = (defaultValue) => (
        { name, value }
    ) => {
        const params = {
            ...searchParams,
            [name]: value
        };
        if (value == defaultValue) {
            delete params[name];
            delete params['page'];
        }
        navigate(null, params);
    }

    return (
        <div className='c-catalog-header'>
            <div className="c-catalog-header__inner">


            </div>
            <div className="c-catalog-header__filters">
                {catalogFilters?.map(catalogFilter => {
                    if (catalogFilter.type === 'checkbox') {
                        return (
                            <UiCheckbox
                                key={catalogFilter.name}
                                name={catalogFilter.name}
                                label={catalogFilter.label}
                                value={catalogFilter.value}
                                onChange={handleChangeFilter(catalogFilter)}
                            />
                        );
                    }
                    if (catalogFilter.type === 'checklist') {
                        return (
                            <UiChecklist
                                isFlat
                                key={catalogFilter.name}
                                name={catalogFilter.name}
                                items={catalogFilter.items}
                                value={catalogFilter.value}
                                onChange={handleChangeFilter(catalogFilter)}
                            />
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    )
});
