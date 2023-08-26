'use client';

import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import { COLORS, ROUTES } from "shared/contants";
import { useRouter } from "shared/hooks";
import { LayoutService, UserService } from "shared/services";
import { UiButton, UiIcon, UiLink, UiWrap } from "shared/ui";

import { LayoutHeaderPhone} from "../LayoutHeaderPhone";
import { LayoutHeaderLogin } from "../LayoutHeaderLogin";
import { LayoutHeaderSearch } from "../LayoutHeaderSearch";
import { LayoutHeaderDefault } from "../LayoutHeaderDefault";
import { LayoutHeaderHome } from "../LayoutHeaderHome";

import './index.scss';
import {MediaPropType} from "shared/types";

type PropsType = {
    children?: React.ReactNode,
    template?: 'home'

}

export const LayoutHeader = observer(({template, children} : PropsType) => {
    const router = useRouter();
    useEffect(() => {
        const handleMinified = () => {
            const isMinified = window.scrollY > 20;
            if (LayoutService.headerIsMinified !== isMinified) {
                LayoutService.set("headerIsMinified", isMinified);
            }
        }
        handleMinified();
        window.addEventListener('scroll', handleMinified);

        return () => window.removeEventListener('scroll', handleMinified)
    }, []);
    if(template === 'home'){
        return (<LayoutHeaderHome></LayoutHeaderHome>);
    }
    return <LayoutHeaderDefault>{children}</LayoutHeaderDefault>;

});
