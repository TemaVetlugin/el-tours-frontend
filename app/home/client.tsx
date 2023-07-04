'use client';

import React from "react";

import { useCity, useObservable, useObserve, useUser } from "shared/hooks";
import { UiContentResource, UiPage } from "shared/ui";
import { observer } from "mobx-react-lite";
import { homeQuery } from "shared/queries/frontend";
import { ReturnType } from "shared/types";

type PropsType = ReturnType<typeof homeQuery>['data'];
export const Client = observer(() => {
    return (
        <UiPage>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs/>
                <UiPage.Title value={'Главная'}/>
                <UiContentResource code={'home.banner1'} render={(contentResource) => (
                    <div>{contentResource.value1}</div>
                )}/>
            </UiPage.Wrap>
        </UiPage>
    );
});
