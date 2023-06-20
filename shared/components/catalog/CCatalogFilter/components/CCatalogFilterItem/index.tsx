import React from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { UiChecklist, UiIcon, UiRadio, UiRange } from "shared/ui";
import { ChangeHandlerType } from "shared/types";
import { CatalogFilterModel } from "shared/models";
import { COLORS } from "shared/contants";
import { useObservable } from "shared/hooks";

import './index.scss';

type PropsType = {
    catalogFilter: CatalogFilterModel,
    onChange: ChangeHandlerType<any>
}

export const CCatalogFilterItem = observer((
    { catalogFilter, onChange }: PropsType
) => {
    const store = useObservable({
        search: ''
    });
    const classNames = classnames('c-catalog-filter-item', {
        'c-catalog-filter-item--collapsable': catalogFilter.isCollapsable,
        'c-catalog-filter-item--opened': catalogFilter.isOpened || !catalogFilter.isCollapsable,
    });

    if (catalogFilter.items === null || !catalogFilter.items?.length) {
        return null;
    }

    if (catalogFilter.type === 'range' && catalogFilter.range[1] === 0) {
        return null;
    }

    const items = store.search
        ? catalogFilter.items.filter(item => item?.name?.toLowerCase().indexOf(store.search.toLowerCase()) > -1)
        : catalogFilter.items

    return (
        <div className={classNames}>
            <div className="c-catalog-filter-item__header" onClick={() => {
                if (catalogFilter.isCollapsable) {
                    catalogFilter.update({
                        isOpened: !catalogFilter.isOpened
                    });
                }
            }}>
                {catalogFilter.label && (
                    <>
                        <div className="c-catalog-filter-item__label">{catalogFilter.label}</div>
                        <div className="c-catalog-filter-item__icon">
                            <UiIcon
                                size={16}
                                name={catalogFilter.isOpened ? 'chevronUp' : "chevronDown"}
                                color={COLORS.GRAY_PRIMARY}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className="c-catalog-filter-item__inner">
                {catalogFilter.isSearchable && (
                    <div className="c-catalog-filter-item__search">
                        <UiIcon size={16} name={'search'}/>
                        <input
                            type="text"
                            value={store.search || ''}
                            onChange={(e) => {
                            store.set("search", e.target.value);
                        }}
                            placeholder={'Поиск'}
                        />
                    </div>
                )}
                {catalogFilter.type === 'range' && (
                    <UiRange
                        min={catalogFilter.range[0]}
                        max={catalogFilter.range[1]}
                        value={catalogFilter.value}
                        name={catalogFilter.name}
                        onChange={onChange}
                    />
                )}
                {catalogFilter.type === 'checklist' && (
                    <UiChecklist
                        value={catalogFilter.value}
                        name={catalogFilter.name}
                        items={items}
                        onChange={onChange}
                    />
                )}
                {catalogFilter.type === 'radio' && (
                    <UiRadio
                        value={catalogFilter.value}
                        name={catalogFilter.name}
                        items={items}
                        onChange={onChange}
                    />
                )}
            </div>
        </div>
    )
});
