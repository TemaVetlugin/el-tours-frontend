import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { useRouter } from "next/router";

import { PaginationModel } from "shared/models";
import { UiLoading } from "shared/uikit";

import { UiIcon } from "../UiIcon";

import { COLORS } from "shared/contants";

import './index.scss';

type PropsType = {
    pagination: PaginationModel,
    className?: string,
    isMore?: boolean,
    isLoading?: boolean
}

export const UiPagination = observer(({ pagination, className, isMore, isLoading }: PropsType) => {
    const router = useRouter();

    const page: number = +(router?.query?.page as string) || 1;

    const handleChange = (page: number | string | undefined) => {
        const query = {
            ...router.query,
            page
        };
        if (page == 1) {
            delete query['page'];
        }
        window.scrollTo({
            top: 0
        });
        router.push({ query }, undefined, { shallow: true })
    }

    if (pagination.pages < 2) {
        return null;
    }

    if (isMore) {
        if (isLoading) {
            return (
                <div className="ui-pagination-more">
                    <UiLoading isLoading style={{ width: 50 }}/>
                </div>
            )
        }
        if (pagination.page >= pagination.pages) {
            return null;
        }
        return (
            <div className="ui-pagination-more" onClick={() => {
                pagination.update({
                    page: pagination.page + 1
                })
            }}>
                ещё
            </div>
        )
    }

    const classNames = classnames('ui-pagination', className);

    return (
        <div className={classNames}>
            <div className="ui-pagination__page ui-pagination__page--aside" onClick={() => {
                if (page > 1) {
                    handleChange(page - 1);
                }
            }}>
                <UiIcon size={24} name='chevronLeft' color={COLORS.PRIMARY}/>
                <span>Назад</span>
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
                <span>Далее</span>
                <UiIcon size={24} name='chevronRight' color={COLORS.PRIMARY}/>
            </div>
        </div>
    )
});
