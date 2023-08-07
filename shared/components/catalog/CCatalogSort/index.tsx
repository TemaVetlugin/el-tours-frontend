'use client';

import React, { useMemo, useRef } from "react";
import classnames from "classnames";
import { observer } from "mobx-react-lite";

import { UiIcon } from "shared/ui";
import { useStore, useOnClickOutside, useRouter, useSearchParams } from "shared/hooks";

import './index.scss';

export const CCatalogSort = observer(() => {
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const params = useSearchParams({
        sort: 'name_asc'
    });
    const store = useStore({
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
        const query: Record<string, any> = {
            ...params,
        };
        if (defaultValue === id) {
            delete query['sort'];
        } else {
            query['sort'] = id;
        }

        router.replace(null, query);
        setTimeout(() => store.set("isOpened", false), 10);
    }

    useOnClickOutside(ref, () => {
        store.set("isOpened", false);
    });

    const selected = items.find(item => item.id === params.sort) || items[0];
    return (
        <div className={'c-catalog-sort'}>
            <div className="c-catalog-sort__label">
                Сортировать:
            </div>
            <div
                ref={ref}
                onClick={() => {
                    store.set("isOpened", !store.isOpened)
                }}
                className={classnames('c-catalog-sort-control', {
                    'c-catalog-sort-control--opened': store.isOpened
                })}
            >
                <div className="c-catalog-sort-control__body">
                    <UiIcon size={24} name={'sort'}/>
                    <span>{selected.name}</span>
                    <UiIcon size={16} name={'chevronDown'}/>
                </div>
                <div className="c-catalog-sort-control__items">
                    {items.map(item => {
                        return (
                            <div
                                key={item.id}
                                className={classnames('c-catalog-sort-control__item', {
                                    'c-catalog-sort-control__item--active': item.id === selected.id
                                })}
                                onClick={() => {
                                    handleSelect(item.id)
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
