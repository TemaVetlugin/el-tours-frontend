'use client'

import React from "react";
import { observer } from "mobx-react-lite";

import { BrandModel } from "shared/models";
import { UiIcon, UiSlider } from "shared/ui";

import './index.scss';

type PropsType = {
    brands: BrandModel[],
}

export const PHomeBrands = observer(({ brands }: PropsType) => {
    return (
        <UiSlider
            className={'p-home-brands'}
            items={brands}
            perPage={5}
            perGroup={1}
            loop
            renderItem={(brand: BrandModel) => {
                return (
                    <div className="p-home-brands-slide">
                        <img src={brand.image} alt=""/>
                    </div>
                )
            }}
            renderNavigation={(navigation) => {
                if (navigation.pages() < 2) {
                    return null;
                }
                return (
                    <>
                        <div className='p-home-brands__control'>
                            <div className="p-home-brands__arrow" onClick={navigation.prev}>
                                <UiIcon size={25} name={'chevronLeft'}/>
                            </div>
                        </div>
                        <div
                            className='p-home-brands__control p-home-brands__control--next'>
                            <div className="p-home-brands__arrow" onClick={navigation.next}>
                                <UiIcon size={25} name={'chevronRight'}/>
                            </div>
                        </div>
                    </>
                );
            }}
        />
    )
})
