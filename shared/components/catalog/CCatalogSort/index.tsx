'use client';

import React, { useMemo } from "react";
import classnames from "classnames";
import { observer } from "mobx-react-lite";

import { UiIcon } from "shared/ui";
import { useNavigate, useObservable, useSearchParams } from "shared/hooks";

import './index.scss';

export const CCatalogSort = observer(() => {
    const navigate = useNavigate();
    const params = useSearchParams({
        sort: 'name_asc'
    });
    const store = useObservable({
        value: params.sort,
        isOpened: false
    });

    const items = useMemo(() => {
        const base = [
            { id: 'name_asc', name: 'По названию А-Я' },
            { id: 'name_desc', name: 'По названию Я-А' },
            { id: 'price_asc', name: 'Сначала дешевле' },
            { id: 'price_desc', name: 'Сначала дороже' }
        ];

        return base;
    }, []);

    const defaultValue = useMemo(() => {
        return 'name_asc';
    }, []);

    const handleSelect = (id: string) => {
        const query = {
            ...params,
        };
        if (defaultValue === id) {
            delete query['sort'];
        } else {
            query['sort'] = id;
        }

        navigate(null, query, true);
        store.set("isOpened", false);
    }

    const item = items.find(item => item.id === store.value) || items[0];
    return (
        <div className={classnames('c-catalog-sort', {
            'c-catalog-sort--opened': store.isOpened
        })}>
            <div className="c-catalog-sort__label">
                Сортировать:
            </div>
            <div className="c-catalog-sort-control">
                <div className="c-catalog-sort-control__body">
                    <UiIcon size={24} name={'sort'}/>
                    <span>{item.name}</span>
                    <UiIcon size={24} name={'chevronDown'}/>
                </div>
                <div className="c-catalog-sort-control__items">
                    {items.map(item => {
                        return (
                            <div
                                key={item.id}
                                className={classnames('c-catalog-sort-control__item', {
                                    'c-catalog-sort-control__item--active': item.id === store.value
                                })}
                                onClick={() => {
                                    store.set("value")
                                }}
                            >
                                <UiIcon size={16} name={'check'}/>
                                <span>{item.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
});
