import React, { useEffect } from "react";
import { observer } from "mobx-react";

import './index.scss';
import { UiIcon } from "shared/uikit";
import { COLORS } from "shared/contants";
import classnames from "classnames";
import { useObservable } from "shared/hooks";


export const LayoutToTop = observer(() => {
    const store = useObservable({
        isActive: false
    });

    useEffect(() => {
        const onScroll = () => {
            store.set("isActive", window.scrollY > 400);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div
            onClick={handleClick}
            className={classnames('layout-to-top', { 'layout-to-top--active': store.isActive })}
        >
            <UiIcon size={16} name={"arrowTop"} color={COLORS.WHITE}/>
        </div>
    )
})

