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
            {_items[_items.length-2]&&
                <UiLink href={_items[_items.length-2].url} className='ui-page-breadcrumbs__item'>
                    <div className="ui-page-breadcrumbs__arrow">
                        <UiIcon size={[32,10]} name={"arrowLeft"}/>
                    </div>
                    {_items[_items.length-2]&&_items[_items.length-2].name}
                </UiLink>
            }


        </div>
    )
})
