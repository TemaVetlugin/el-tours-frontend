import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { useRouter } from "next/router";

import { UiChecklist, UiIcon, UiRadio, UiRange } from "shared/uikit";
import { ChangeHandlerType } from "shared/types";
import { CatalogFilterModel } from "shared/models";
import { COLORS } from "shared/contants";

import './index.scss';

type PropsType = {
    catalogFilter: CatalogFilterModel,
}

export const CCatalogFiltersItem = observer(({ catalogFilter }: PropsType) => {
    const handleChange: ChangeHandlerType<any> = ({ name, value }) => {
        catalogFilter.update({ value });
    }

    const classNames = classnames('c-catalog-filters-item', {
        'c-catalog-filters-item--collapsable': catalogFilter.isCollapsable,
        'c-catalog-filters-item--opened': catalogFilter.isOpened,
    });

    if (catalogFilter.items === null || !catalogFilter.items?.length) {
        return null;
    }

    if (catalogFilter.type === 'range' && catalogFilter.items[1] === 0) {
        return null;
    }

    return (
        <div className={classNames}>
            <div className="c-catalog-filters-item__header" onClick={() => {
                if (catalogFilter.isCollapsable) {
                    catalogFilter.update({
                        isOpened: !catalogFilter.isOpened
                    });
                }
            }}>
                <div className="c-catalog-filters-item__label">{catalogFilter.label}</div>
                <div className="c-catalog-filters-item__icon">
                    <UiIcon
                        size={10}
                        name={catalogFilter.isOpened ? 'arrowTop' : "arrowBottom"}
                        color={COLORS.WHITE}
                    />
                </div>
            </div>
            <div className="c-catalog-filters-item__inner">
                {catalogFilter.type === 'range' && (
                    <UiRange
                        min={catalogFilter.items[0]}
                        max={catalogFilter.items[1]}
                        value={catalogFilter.value}
                        name={catalogFilter.name}
                        onChange={handleChange}
                    />
                )}
                {catalogFilter.type === 'checklist' && (
                    <UiChecklist
                        value={catalogFilter.value}
                        name={catalogFilter.name}
                        items={catalogFilter.items}
                        onChange={handleChange}
                    />
                )}
                {catalogFilter.type === 'radio' && (
                    <UiRadio
                        value={catalogFilter.value}
                        name={catalogFilter.name}
                        items={catalogFilter.items}
                        onChange={handleChange}
                    />
                )}
            </div>
        </div>
    )
});
