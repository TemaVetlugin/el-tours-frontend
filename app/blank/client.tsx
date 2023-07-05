'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiPage, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";

import './page.scss';


export const Client = observer(() => {
    return (
        <UiPage>
            <UiWrap>
                <UiPage.Breadcrumbs items={[ROUTES.CART()]}/>
                <UiPage.Title value={'title'}/>

            </UiWrap>
        </UiPage>
    )
});
