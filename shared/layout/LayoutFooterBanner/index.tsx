'use client';

import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import React from "react";

import { LayoutService } from "shared/services";

import './index.scss';

export const LayoutFooterBanner = observer(() => {
    const pathname = usePathname();
    const footerBanner = LayoutService.footerBanners.find(footerBanner => footerBanner.url === pathname);
    if (!footerBanner) {
        return null;
    }
    return (
        <div className="layout-footer-banner">
            <img src={footerBanner.image} alt=""/>
        </div>
    );
});
