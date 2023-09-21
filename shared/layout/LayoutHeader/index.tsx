'use client';

import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";

import {useRouter} from "shared/hooks";
import {AppService} from "shared/services";
import {LayoutHeaderDefault} from "shared/layout";
import {LayoutHeaderHome} from "shared/layout";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    template?: 'home'

}

export const LayoutHeader = observer(({template, children} : PropsType) => {
    const router = useRouter();
    useEffect(() => {
        const handleMinified = () => {
            const isMinified = window.scrollY > 20;
            if (AppService.headerIsMinified !== isMinified) {
                AppService.set("headerIsMinified", isMinified);
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
