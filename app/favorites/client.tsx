'use client';

import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import { CCatalog, CCatalogProductsViewed } from "shared/components/catalog";
import { COLORS, ROUTES } from "shared/contants";
import { useIsBooting, useRouter } from "shared/hooks";
import { UserService } from "shared/services";
import { UiDataBoundary, UiIcon, UiPage } from "shared/ui";

import image from './assets/image.png';


export const Client = observer(() => {
    const isBooting = useIsBooting();
    const router = useRouter();

    useEffect(() => {
        if (isBooting) {
            return;
        }
        if (!UserService.isAuthorized()) {
            router.push(ROUTES.HOME());
        }
    }, [isBooting, router]);

    const id = UserService.user.userFavorites.map(userFavorite => userFavorite.catalogProductId)
    return (
        <UiPage className={'p-favorites'}>
            <UiPage.Wrap>
                <UiDataBoundary isLoading={isBooting}>
                    <UiPage.Breadcrumbs
                        items={[
                            ROUTES.FAVORITES(),
                        ]}
                    />
                    {id.length === 0 && (
                        <div className={'p-favorites__inner'}>
                            <div>
                                <div className="p-favorites__title">
                                    В избранном пока ничего нет
                                </div>
                                <div className="p-favorites__description">
                                    <span>Добавляйте товары в Избранное с помощью</span>
                                    <UiIcon size={24} name={"heart"} color={COLORS.GRAY_PRIMARY}/>
                                </div>
                            </div>
                            <div className="p-favorites__image" style={{backgroundImage: `url(${image.src})`}}/>
                        </div>
                    )}
                    {id.length > 0 && (
                        <CCatalog
                            title={'Избранное'}
                            params={{
                                id,
                                apply: ['id']
                            }}
                        />
                    )}
                </UiDataBoundary>
                <CCatalogProductsViewed/>
            </UiPage.Wrap>
        </UiPage>
    )
});
