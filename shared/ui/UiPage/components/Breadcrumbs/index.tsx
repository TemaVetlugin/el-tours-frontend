import React from "react";
import { observer } from "mobx-react-lite";

import { ROUTES } from "shared/contants";
import { UiLink } from "shared/ui";


import './index.scss';

type RoutesType = typeof ROUTES;
type RouteType = ReturnType<RoutesType[keyof RoutesType]>;

type PropsType = {
    items?: RouteType[]
}

export const Breadcrumbs = observer(({ items = [] }: PropsType) => {
    const _items: RouteType[] = [ROUTES.HOME(), ...items];
    return (
        <div className='ui-page-breadcrumbs'>
            {_items.map((item, index) => {
                if (_items.length - 1 <= index || !item.url) {
                    return <div key={item.id} className='ui-page-breadcrumbs__current'>{item.name}</div>;
                }
                return (
                    <React.Fragment key={item.name}>
                        <UiLink href={item.url} className='ui-page-breadcrumbs__item'>
                            {item.name}
                        </UiLink>
                        <div className="ui-page-breadcrumbs__dot">•</div>
                    </React.Fragment>
                )
            })}
        </div>
    )
})
