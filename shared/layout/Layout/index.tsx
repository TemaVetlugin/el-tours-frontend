import React from "react";
import { observer } from "mobx-react";

import { NotifierModuleComponent } from "shared/modules";
import { CAuthModal } from "shared/components";

import { LayoutHeader } from "../LayoutHeader";
import { LayoutFooter } from "../LayoutFooter";
import { LayoutBody } from "../LayoutBody";
import { LayoutMobile } from "../LayoutMobile";
import { LayoutToTop } from "../LayoutToTop";
import { LayoutCookieLaw } from "../LayoutCookieLaw";

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    withHeader?: boolean,
    withFooter?: boolean
}

export const Layout = observer((
    {
        children,
        withFooter = true,
        withHeader = true
    }: PropsType
) => {
    return (
        <div className='layout'>
            {withHeader && <LayoutHeader/>}
            {withHeader && <LayoutMobile/>}
            <LayoutBody>
                {children}
            </LayoutBody>
            {withFooter && <LayoutFooter/>}
            <LayoutToTop/>
            <NotifierModuleComponent/>
            <CAuthModal/>
            {/*<LayoutCookieLaw/>*/}
        </div>
    )
})

