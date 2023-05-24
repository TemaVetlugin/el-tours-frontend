import { observer } from "mobx-react";
import React from "react";

import { HomePromoBannerModel } from "shared/models";
import { UiSlider } from "shared/uikit";
import { LayoutSection } from "shared/layout";

import './index.scss';

type PropsType = {
    promoBanners: HomePromoBannerModel[]
}

export const PHomePromoBanners = observer(({ promoBanners }: PropsType) => {
    if (promoBanners.length === 0) {
        return null;
    }

    return (
        <LayoutSection>
            <div className="p-home-promo-banners">
                <UiSlider
                    effect='fade'
                    autoPlay={5000}
                    items={promoBanners}
                    loop={true}
                    autoHeight={false}
                    renderItem={(promoBanner: HomePromoBannerModel) => (
                        <a href={promoBanner.href}
                           key={promoBanner.id}
                           target={'_blank'}
                           className='p-home-promo-banners-slide'
                        >
                            <picture>
                                <source media="(max-width: 767px)" srcSet={promoBanner.imageXS}/>
                                <source media="(max-width: 1023px)" srcSet={promoBanner.imageSM}/>
                                <source media="(max-width: 1365px)" srcSet={promoBanner.imageMD}/>
                                <source media="(min-width: 1366px)" srcSet={promoBanner.image}/>
                                <img src={promoBanner.image} alt=""/>
                            </picture>
                        </a>
                    )}
                />
            </div>
        </LayoutSection>
    )
});
