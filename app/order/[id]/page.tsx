'use client';

import React from "react";
import { observer } from "mobx-react-lite";
import { UiPage } from "shared/ui";

export default observer(function TestPage() {

    return (
        <UiPage>
            <UiPage.Title value={'Заказ'}/>
        </UiPage>
    )
})
