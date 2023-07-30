'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { HomeBannerModel } from "shared/models";
import { UiContentResource, UiGrid, UiIcon, UiSlider } from "shared/ui";
import { COLORS } from "shared/contants";

import actionImage from './assets/action.svg';
import arrowImage from './assets/arrow.svg';
import './index.scss';

type PropsType = {
    homeBanners: HomeBannerModel[],
}

export const PHomeBanners = observer(({ homeBanners }: PropsType) => {
    return (
        <UiGrid columns={'2fr 1fr'} gap={20} className="p-home-banners">
            <UiSlider
                className={'p-home-banners-slider'}
                items={homeBanners}
                autoPlay={5000}
                renderItem={(homeBanner: HomeBannerModel) => {
                    return (
                        <div className={'p-home-banners-slide'} style={{ backgroundImage: `url(${homeBanner.image})` }}>
                            <div className="p-home-banners-slide__panel">
                                <div className="p-home-banners-slide__name">{homeBanner.name}</div>
                                <a
                                    href={homeBanner.actionUrl}
                                    className="p-home-banners-slide__action"
                                    style={{
                                        backgroundImage: `url(${actionImage.src})`
                                    }}
                                >
                                    <UiIcon size={32} name={"arrowUpRight"} color={COLORS.WHITE}/>
                                    <span>
                                        {homeBanner.actionLabel}
                                    </span>
                                </a>
                            </div>
                        </div>
                    )
                }}
                renderNavigation={(navigation) => (
                    <>
                        <div
                            style={{ backgroundImage: `url(${arrowImage.src})` }}
                            className="p-home-banners-slider__arrow"
                            onClick={navigation.prev}
                        />
                        <div className={'p-home-banners-slider__dots'}>
                            {navigation.dots('p-home-banners-slider__dot')}
                        </div>
                        <div
                            style={{ backgroundImage: `url(${arrowImage.src})` }}
                            className="p-home-banners-slider__arrow p-home-banners-slider__arrow--next"
                            onClick={navigation.next}
                        />
                    </>
                )}
            />
            <div className="p-home-banners__aside">
                <UiContentResource code={'home.banner1'} render={(contentResource) => (
                    <a
                        href={contentResource.value1}
                        className="p-home-banners-item"
                        style={{ backgroundImage: `url(${contentResource.image1})` }}
                    >
                        <div className="p-home-banners-item__panel">
                            <div className="p-home-banners-item__name" style={{ color: contentResource.value3 }}>
                                {contentResource.value2}
                            </div>
                        </div>
                    </a>
                )}/>
                <UiContentResource code={'home.banner2'} render={(contentResource) => (
                    <a
                        href={contentResource.value1}
                        className="p-home-banners-item"
                        style={{ backgroundImage: `url(${contentResource.image1})` }}
                    >
                        <div className="p-home-banners-item__panel">
                            <div className="p-home-banners-item__name" style={{ color: contentResource.value3 }}>
                                {contentResource.value2}
                            </div>
                        </div>
                    </a>
                )}/>
            </div>
        </UiGrid>
    )
})
