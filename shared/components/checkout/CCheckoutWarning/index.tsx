'use client'

import React from "react";
import { observer } from "mobx-react-lite";
import { UiIcon } from "shared/ui";

import './index.scss';


export const CCheckoutWarning = observer(() => {
    return (
        <div className="c-checkout-warning">
            <UiIcon size={38} name={"exclamationCircle"}/>
            <div className="c-checkout-warning__text">
                Цены на сайте и в приложении отличаются от цен в аптеках и действуют при оформлении заказа
            </div>
        </div>
    )
})
