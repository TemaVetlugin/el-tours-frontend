'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { PaginationModel } from "shared/models";
import { useRouter, useSearchParams } from "shared/hooks";
import { UiIcon } from "shared/ui";

import './index.scss';

type PropsType = {
    pagination: PaginationModel,
    className?: string,
}

export const Pagination = observer(({ pagination, className }: PropsType) => {
    const router = useRouter();
    const searchParams = useSearchParams({});
    const { page } = pagination;

    const handleChange = (page: number | string | undefined) => {
        window.scrollTo({ top: 0 });
        pagination.update({ page: page || 1 });
        router.replace(null, {
            ...searchParams,
            page: page || 1
        });
    }

    if (pagination.pages < 2) {
        return null;
    }

    return (
        <div className={classnames('ui-pages-pagination', className)}>
            {page > 1 && (
                <div className="ui-pages-pagination-aside" onClick={() => handleChange(page - 1)}>
                    <UiIcon size={24} name='chevronLeft'/>
                    <span>Назад</span>
                </div>
            )}
            {pagination.items.map(item => {
                const className = classnames('ui-pages-pagination__page', {
                    'ui-pages-pagination__page--active': item.id == page
                })
                return (
                    <div key={item.id} className={className} onClick={() => handleChange(item.id)}>
                        {item.name}
                    </div>
                )
            })}
            {page < pagination.pages && (
                <div className="ui-pages-pagination-aside" onClick={() => handleChange(page + 1)}>
                    <span>Далее</span>
                    <UiIcon size={24} name='chevronRight'/>
                </div>
            )}
        </div>
    )
});
