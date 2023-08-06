'use client';

import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import React from "react";

import { LayoutService } from "shared/services";
import { UiLink, UiPage } from "shared/ui";

import './index.scss';

export const LayoutFooterBanner = observer(() => {
    const pathname = usePathname();
    const footerBanner = LayoutService.footerBanners.find(footerBanner => footerBanner.url === pathname);

    if (!footerBanner || !footerBanner.image) {
        return null;
    }

    return (
        <UiPage.Wrap>
            <UiLink href={footerBanner.url} className="layout-footer-banner">
                <img src={footerBanner.image} alt=""/>
            </UiLink>
        </UiPage.Wrap>
    );
});
