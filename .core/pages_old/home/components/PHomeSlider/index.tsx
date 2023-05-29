import { observer } from "mobx-react";
import React from "react";

import { HomeBannerModel } from "shared/models";
import { UiButton, UiSlider, UiIcon } from "shared/uikit";
import { COLORS } from "shared/contants";
import { LayoutSection } from "shared/layout";

import './index.scss';

type PropsType = {
    homeBanners: HomeBannerModel[]
}

export const PHomeSlider = observer(({ homeBanners }: PropsType) => {
    if (homeBanners.length === 0) {
        return null;
    }
    return (
        <LayoutSection>
            <UiSlider
                effect='fade'
                autoPlay={5000}
                items={homeBanners}
                renderItem={(homeBanner: HomeBannerModel) => (
                    <div
                        key={homeBanner.id}
                        className='p-home-slider-slide'
                        style={{ backgroundImage: `url(${homeBanner.backgroundImage})` }}
                    >
                        <div className="p-home-slider-slide__inner">
                            <div className="p-home-slider-slide__name">{homeBanner.name}</div>
                            <UiButton
                                label={homeBanner.actionLabel}
                                href={homeBanner.actionUrl}
                                style={{ padding: '0 38px' }}
                                colors={{
                                    button: [COLORS.YELLOW1, COLORS.YELLOW2],
                                    border: [COLORS.YELLOW1, COLORS.YELLOW2],
                                    label: [COLORS.BLACK, COLORS.BLACK]
                                }}
                            />
                        </div>
                        <div className="p-home-slider-slide__preview">
                            {homeBanner.badgeLabel && (
                                <div className="p-home-slider-slide__badge">{homeBanner.badgeLabel}</div>
                            )}
                            <div
                                className="p-home-slider-slide__image"
                                style={{ backgroundImage: `url(${homeBanner.image})` }}
                            />
                        </div>
                    </div>
                )}
                renderNavigation={(navigation) => (
                    <div className='p-home-slider-navigation'>
                        <div className="p-home-slider-navigation__button" onClick={navigation.prev}>
                            <UiIcon size={8} name={'chevronLeft'} color={COLORS.WHITE}/>
                        </div>
                        <div className="p-home-slider-navigation__dots">
                            {navigation.dots('p-home-slider-navigation__dot')}
                        </div>
                        <div className="p-home-slider-navigation__button" onClick={navigation.next}>
                            <UiIcon size={8} name={'chevronRight'} color={COLORS.WHITE}/>
                        </div>
                    </div>
                )}
            />
        </LayoutSection>
    )
});
