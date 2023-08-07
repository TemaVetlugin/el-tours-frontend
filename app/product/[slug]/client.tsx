'use client';

import classnames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { CCatalogProductBadges, CCatalogProductsSlider } from "shared/components/catalog";
import { COLORS, ROUTES } from "shared/contants";

import { useAsyncEffect, useCity, useStore } from "shared/hooks";
import { CatalogProductModel, CatalogProductModelInterface } from "shared/models";
import { catalogProductsGetQuery } from "shared/queries/main";
import { CatalogService } from "shared/services";
import { UiButton, UiIcon, UiLightbox, UiLink, UiPage, UiSlider } from "shared/ui";
import { html } from "shared/utilities";
import { PProductCommerce } from "./components/PProductCommerce";

import { PProductStore } from "./components/PProductStore";
import { PROPERTIES } from "./constants/properties";

import { TABS } from "./constants/tabs";

import playImage from './assets/play.svg';

import './page.scss';

type PropsType = {
    catalogProduct: CatalogProductModelInterface
}

export const Client = observer(({ catalogProduct }: PropsType) => {
    const store = useStore({
        tab: 'description',
        activeSlide: 0,
        isLightbox: false,
        lightboxIndex: 0,
        catalogProduct: new CatalogProductModel(catalogProduct),
        isLoading: true,
    });
    const city = useCity();

    useEffect(() => {
        CatalogService.view(store.catalogProduct.id, city.id);
    }, [store, city])

    useAsyncEffect(async () => {
        store.set("isLoading", true);
        const { data, isSuccess } = await catalogProductsGetQuery({
            cityId: city.id,
            slug: store.catalogProduct.slug,
            isHydrate: true
        });
        if (isSuccess && data) {
            store.catalogProduct.update(data.item);
        }
        store.set("isLoading", false);
    }, [city]);

    const tab = TABS.find(tab => tab.id === store.tab);
    const media = [
        ...store.catalogProduct.images.map((src) => ({type: 'image', src})),
        ...store.catalogProduct.gifs.map((src) => ({type: 'image', src})),
        ...store.catalogProduct.videos.map((src) => ({type: 'video', src})),
    ];
    return (
        <UiPage className={'p-product'}>
            <UiPage.Wrap>
                <UiPage.Breadcrumbs
                    items={[
                        ...CatalogService.breadcrumbs(catalogProduct.catalogCategoryId),
                        ROUTES.PRODUCT(catalogProduct)
                    ]}
                />
                <UiPage.Header title={store.catalogProduct.name}/>
                <div className="p-product__preview">
                    <div className="p-product-media">
                        <CCatalogProductBadges badges={store.catalogProduct.badges} className={'p-product__badges'}/>
                        {media.length > 0 && (
                            <UiLightbox
                                items={media}
                                isOpened={store.isLightbox}
                                onClose={() => store.set("isLightbox", false)}
                                index={store.lightboxIndex}
                            />
                        )}
                        <div
                            onClick={() => {
                                store.set("isLightbox", true);
                            }}
                            className="p-product-media__image"
                            style={{ backgroundImage: `url(${media[store.activeSlide]?.src ?? store.catalogProduct.image})` }}
                        />
                        {media.length > 0 && (
                            <UiSlider
                                className={'p-product-media-slider'}
                                slideClassName={'p-product-media-slide'}
                                perGroup={1}
                                perPage={'auto'}
                                gap={6}
                                items={media}
                                renderItem={(item, _, index) => (
                                    <div
                                        className={classnames('p-product-media-slide__inner', {
                                            'p-product-media-slide__inner--active': index === store.activeSlide
                                        })}
                                    >
                                        {item.type === 'image' && (
                                            <div
                                                className={'p-product-media-slide__image'}
                                                onClick={() => {
                                                    store.set("activeSlide", index);
                                                    store.set("lightboxIndex", index);
                                                }}
                                                style={{
                                                    backgroundImage: `url(${item.src})`
                                                }}
                                            />
                                        )}
                                        {item.type === 'video' && (
                                            <div className={'p-product-media-slide__video'}
                                                onClick={() => {
                                                    store.set("lightboxIndex", index);
                                                    store.set("isLightbox", true);
                                                }}
                                            >
                                                <video src={item.src}/>
                                                <div className="p-product-media-slide__overlay">
                                                    <img src={playImage.src} alt=""/>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                renderNavigation={(navigation) => {
                                    if (navigation.pages() < 6) {
                                        return null;
                                    }
                                    return (
                                        <>
                                            <div className='p-product-media-slider__control'>
                                                <div className="p-product-media-slider__arrow" onClick={navigation.prev}>
                                                    <UiIcon size={16} name={'chevronLeft'}/>
                                                </div>
                                            </div>
                                            <div
                                                className='p-product-media-slider__control p-product-media-slider__control--next'>
                                                <div className="p-product-media-slider__arrow" onClick={navigation.next}>
                                                    <UiIcon size={16} name={'chevronRight'}/>
                                                </div>
                                            </div>
                                        </>
                                    );
                                }}
                            />
                        )}
                    </div>
                    <div className="p-product__properties">
                        {PROPERTIES.map(property => {
                            const href = property.href(store.catalogProduct);
                            const value = property.value(store.catalogProduct);
                            const image = property.image(store.catalogProduct);
                            if (!value) {
                                return null;
                            }
                            return (
                                <div key={property.id} className="p-product-property">
                                    <div className="p-product-property__name">
                                        <span>{property.label}</span>
                                        <div className="p-product-property__row"/>
                                    </div>
                                    <div className="p-product-property__aside">
                                        {href ? (
                                            <UiLink href={href} className="p-product-property__value p-product-property__value--link">
                                                {value}
                                            </UiLink>
                                        ) : (
                                            <div className="p-product-property__value">
                                                {value}
                                            </div>
                                        )}
                                        {image && (
                                            <img className="p-product-property__image" src={image} alt={property.label}/>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <PProductCommerce isLoading={store.isLoading} catalogProduct={store.catalogProduct}/>
                </div>
                <div className="p-product__info">
                    <div className="p-product__tabs">
                        {TABS.map(tab => {
                            const isActive = tab.id === store.tab;
                            if (!store.catalogProduct[tab.id]) {
                                return null;
                            }
                            return (
                                <UiButton
                                    key={tab.id}
                                    size={'small'}
                                    label={tab.name}
                                    onClick={() => store.set("tab", tab.id)}
                                    colors={isActive ? {
                                        button: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY],
                                        border: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY],
                                        label: [COLORS.WHITE, COLORS.WHITE]
                                    } : {
                                        button: [COLORS.TRANSPARENT, COLORS.LIGHT_BLUE],
                                        border: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY],
                                        label: [COLORS.GRAY_PRIMARY, COLORS.GRAY_PRIMARY]
                                    }}
                                />
                            )
                        })}
                    </div>
                    {(tab && !!store.catalogProduct[tab.id]) && (
                        <div className="p-product-description">
                            <div className="p-product-description__name">
                                {tab.name}
                            </div>
                            <div className="p-product-description__value">
                                {html(store.catalogProduct[tab.id])}
                            </div>
                        </div>
                    )}
                </div>
                {store.catalogProduct.analogues.length > 0 && (
                    <UiPage.Section title={'Аналоги'}>
                        <CCatalogProductsSlider catalogProducts={store.catalogProduct.analogues}/>
                    </UiPage.Section>
                )}
                {store.catalogProduct.catalogProductOffers.length > 0 && (
                    <UiPage.Section id={'stores'} title={'Доступность в аптеках'}>
                        {store.catalogProduct.catalogProductOffers.map(offer => (
                            <PProductStore key={offer.id} catalogProductOffer={offer}/>
                        ))}
                    </UiPage.Section>
                )}
                {store.catalogProduct.recommendations.length > 0 && (
                    <UiPage.Section title={'С этим товаром покупают'}>
                        <CCatalogProductsSlider catalogProducts={store.catalogProduct.recommendations}/>
                    </UiPage.Section>
                )}
            </UiPage.Wrap>
        </UiPage>
    )
        ;
});
