'use client';

import React from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";

import { CatalogService } from "shared/services";
import { UiIcon, UiLink, UiWrap } from "shared/ui";
import { ROUTES } from "shared/contants";
import { useCity } from "shared/hooks";

import './index.scss';

export const LayoutHeaderPromo = observer(() => {
    const city = useCity();
    const compilations = CatalogService.compilations.filter((compilation) => {
        return compilation.cities.some(compilationCity => {
            return +compilationCity.id === +city.id
        });
    })
    return (
        <div className='layout-header-promo'>
            <UiWrap>
                <div className="layout-header-promo__inner">
                    <div className="layout-header-promo__items">
                        <UiLink href={ROUTES.PROMO_ACTIONS()} className="layout-header-promo__item">
                            <UiIcon size={16} name={'percent'}/>
                            <span>Акции</span>
                        </UiLink>
                        <UiLink href={ROUTES.CATALOG_MARK('new')} className="layout-header-promo__item">
                            <UiIcon size={16} name={'novelty'}/>
                            <span>Новинки</span>
                        </UiLink>
                        <UiLink href={ROUTES.CATALOG_MARK('discount')} className="layout-header-promo__item">
                            <UiIcon size={16} name={'ruble'}/>
                            <span>Выгодно</span>
                        </UiLink>
                    </div>
                    <div className="layout-header-promo__compilations">
                        {compilations.map(compilation => (
                            <UiLink
                                key={compilation.id}
                                href={ROUTES.COMPILATION(compilation.slug)}
                                className="layout-header-promo__compilation"
                            >
                                {compilation.name}
                            </UiLink>
                        ))}
                    </div>
                </div>
            </UiWrap>
        </div>
    );
});
