import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { UiChecklist, UiIcon, UiRadio, UiRange } from "shared/ui";
import { ChangeHandlerType } from "shared/types";
import { CatalogFilterModel } from "shared/models";
import { COLORS } from "shared/contants";

import './index.scss';

type PropsType = {
    catalogFilter: CatalogFilterModel,
}

export const CCatalogFilterItem = observer(({ catalogFilter }: PropsType) => {
    const handleChange: ChangeHandlerType<any> = ({ name, value }) => {
        catalogFilter.update({ value });
        onChange();
    }

    const classNames = classnames('c-catalog-filter-item', {
        'c-catalog-filter-item--collapsable': catalogFilter.isCollapsable,
        'c-catalog-filter-item--opened': catalogFilter.isOpened,
    });

    if (catalogFilter.items === null || !catalogFilter.items?.length) {
        return null;
    }

    if (catalogFilter.type === 'range' && catalogFilter.items[1] === 0) {
        return null;
    }

    return (
        <div className={classNames}>
            <div className="c-catalog-filter-item__header" onClick={() => {
                if (catalogFilter.isCollapsable) {
                    catalogFilter.update({
                        isOpened: !catalogFilter.isOpened
                    });
                }
            }}>
                <div className="c-catalog-filter-item__label">{catalogFilter.label}</div>
                <div className="c-catalog-filter-item__icon">
                    <UiIcon
                        size={10}
                        name={catalogFilter.isOpened ? 'arrowUp' : "arrowDown"}
                        color={COLORS.WHITE}
                    />
                </div>
            </div>
            <div className="c-catalog-filter-item__inner">
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
