'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { PaginationModel } from "shared/models";
import { useNavigate, useSearchParams } from "shared/hooks";
import { UiIcon } from "shared/ui";

import './index.scss';

type PropsType = {
    pagination: PaginationModel,
    className?: string,
}

export const Pagination = observer(({ pagination, className }: PropsType) => {
    const navigate = useNavigate();
    const searchParams = useSearchParams({});
    const { page } = pagination;

    const handleChange = (page: number | string | undefined) => {
        window.scrollTo({
            top: 0
        });

        navigate(null, {
            ...searchParams,
            page: page || 1
        }, true)
    }

    if (pagination.pages < 2) {
        return null;
    }

    return (
        <div className={classnames('ui-pagination', className)}>
            <div className="ui-pagination__page ui-pagination__page--aside" onClick={() => {
                if (page > 1) {
                    handleChange(page - 1);
                }
            }}>
                <UiIcon size={10} name='chevronLeft'/>
            </div>
            {pagination.items.map(item => {
                const className = classnames('ui-pagination__page', {
                    'ui-pagination__page--active': item.id == page
                })
                return (
                    <div key={item.id} className={className} onClick={() => handleChange(item.id)}>
                        {item.name}
                    </div>
                )
            })}
            <div className="ui-pagination__page ui-pagination__page--aside" onClick={() => {
                if (page < pagination.pages) {
                    handleChange(page + 1);
                }
            }}>
                <UiIcon size={10} name='chevronRight'/>
            </div>
        </div>
    )
});
