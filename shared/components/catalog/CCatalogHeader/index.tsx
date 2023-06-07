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
                <UiDropdown
                    label='На странице:'
                    onChange={handleChangeDropdown(12)}
                    value={(query['per_page'] as string) ?? 12}
                    name='per_page'
                    items={[{
                        id: 12,
                        name: '12 товаров'
                    }, {
                        id: 24,
                        name: '24 товара'
                    }, {
                        id: 36,
                        name: '36 товаров'
                    }]}
                />
                <UiDropdown
                    label='Сортировать по:'
                    onChange={handleChangeDropdown(defaultSort)}
                    value={(query['sort'] as string) ?? defaultSort}
                    name='sort'
                    items={[{
                        id: 'search',
                        name: 'релевантности'
                    }, {
                        id: 'price_asc',
                        name: 'возрастанию цены'
                    }, {
                        id: 'price_desc',
                        name: 'убыванию цены'
                    }, {
                        id: 'name_asc',
                        name: 'по названию от А до Я'
                    }, {
                        id: 'name_desc',
                        name: 'по названию от Я до А'
                    }]}
                />
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
