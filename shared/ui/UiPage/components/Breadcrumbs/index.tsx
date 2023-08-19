import React from "react";
import { observer } from "mobx-react-lite";

import { ROUTES } from "shared/contants";
import {UiIcon, UiLink} from "shared/ui";


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
                    return ;
                }
                return (
                    <React.Fragment key={item.name}>
                        <div className="ui-page-breadcrumbs__arrow">
                            <UiIcon size={[32,10]} name={"arrowLeft"}/>
                        </div>
                        <UiLink href={item.url} className='ui-page-breadcrumbs__item'>
                            {item.name}
                        </UiLink>
                    </React.Fragment>
                )
            })}
        </div>
    )
})
