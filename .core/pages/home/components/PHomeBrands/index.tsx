import { observer } from "mobx-react";
import React from "react";

import { BrandModel2 } from "shared/models";
import { UiIcon, UiSlider } from "shared/uikit";
import { LayoutSection } from "shared/layout";
import { COLORS } from "shared/contants";

import './index.scss';

type PropsType = {
    brands: BrandModel2[]
}

export const PHomeBrands = observer(({ brands }: PropsType) => {
    return (
        <LayoutSection className={'p-home-brands'}>
            <div className="p-home-brands-slider">
                <UiSlider
                    effect='slide'
                    items={brands}
                    perPage={'auto'}
                    loop={true}
                    renderItem={(brand: BrandModel2) => (
                        <a href={'#'}
                           target={'_blank'}
                           key={brand.id}
                           className='p-home-brands-slider-slide'
                        >
                            <img src={brand.img} alt={brand.name}/>
                        </a>
                    )}
                    renderNavigation={(navigation) => (
                        <div className='p-home-brands-slider-navigation'>
                            <div className="p-home-brands-slider-navigation__button" onClick={navigation.prev}>
                                <UiIcon size={24} name={'chevronLeft'} color={COLORS.PRIMARY}/>
                            </div>
                            <div className="p-home-brands-slider-navigation__button" onClick={navigation.next}>
                                <UiIcon size={24} name={'chevronRight'} color={COLORS.PRIMARY}/>
                            </div>
                        </div>
                    )}
                />
            </div>
        </LayoutSection>
    )
});
