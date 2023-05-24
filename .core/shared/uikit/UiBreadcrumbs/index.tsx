import React from "react";
import { observer } from "mobx-react";

import { BREADCRUMBS } from "shared/contants";
import { MenuItemType } from "shared/types";

import { UiLink } from "../UiLink";

import './index.scss';

type PropsType = {
    items?: MenuItemType[]
}

export const UiBreadcrumbs = observer(({ items = [] }: PropsType) => {
    const _items: MenuItemType[] = [BREADCRUMBS.HOME(), ...items];
    return (
        <div className='ui-breadcrumbs'>
            {_items.map((item, index) => {
                if (_items.length - 1 <= index || !item.href) {
                    return <div key={item.name} className='ui-breadcrumbs__current'>{item.name}</div>;
                }
                return (
                    <React.Fragment key={item.name}>
                        <UiLink href={item.href} className='ui-breadcrumbs__item'>
                            {item.name}
                        </UiLink>
                        <div className="ui-breadcrumbs__dot">•</div>
                    </React.Fragment>
                )
            })}
        </div>
    )
})
