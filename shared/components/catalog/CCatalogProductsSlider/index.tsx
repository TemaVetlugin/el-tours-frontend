'use client';

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import { CatalogProductModel } from "shared/models";
import { UiIcon, UiSlider } from "shared/ui";
import { useMedia, useObservable } from "shared/hooks";
import { CCatalogProduct } from "../CCatalogProduct";
import { MEDIA_POINTS } from "shared/contants";

import './index.scss';

type PropsType = {
    catalogProducts: CatalogProductModel[],
}

export const CCatalogProductsSlider = observer(({ catalogProducts }: PropsType) => {
    const store = useObservable({
        isInitialized: false,
    });

    useEffect(() => {
        store.set("isInitialized", true);
    }, [store])

    const { value: perPage } = useMedia({
        [MEDIA_POINTS.IS_360]: 1,
        [MEDIA_POINTS.IS_768]: 2,
        [MEDIA_POINTS.IS_1024]: 4,
        [MEDIA_POINTS.IS_1440]: 4,
    });

    return (
        <div className={classnames('c-catalog-products-slider', {
            'c-catalog-products-slider--initialized': store.isInitialized,
        })}>
            <UiSlider
                autoHeight
                loop={true}
                gap={16}
                perPage={perPage}
                items={catalogProducts}
                renderItem={(catalogProduct: CatalogProductModel) => (
                    <CCatalogProduct catalogProduct={catalogProduct}/>
                )}
                renderNavigation={(navigation) => {
                    if (navigation.pages() < 2) {
                        return null;
                    }
                    return (
                        <>
                            <div className='c-catalog-products-slider__control'>
                                <div className="c-catalog-products-slider__arrow" onClick={navigation.prev}>
                                    <UiIcon size={25} name={'chevronLeft'}/>
                                </div>
                            </div>
                            <div
                                className='c-catalog-products-slider__control c-catalog-products-slider__control--next'>
                                <div className="c-catalog-products-slider__arrow" onClick={navigation.next}>
                                    <UiIcon size={25} name={'chevronRight'}/>
                                </div>
                            </div>
                        </>
                    );
                }}
            />
        </div>
    )
});
