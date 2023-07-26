'use client'

import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";

import { BrandModel, ManufacturerModel } from "shared/models";
import { UiIcon, UiLink, UiSlider } from "shared/ui";

import './index.scss';
import { ROUTES } from "shared/contants";

type PropsType = {
    brands: BrandModel[],
    manufacturers: ManufacturerModel[],
}
type ItemType = {
    id: string,
    image: string,
    href: string,
    sort: number,
};
export const PHomeBrandsAndManufacturers = observer(({ brands, manufacturers }: PropsType) => {
    const items: ItemType[] = useMemo(() => {
        const result: ItemType[] = [];
        brands.forEach(item => {
            result.push({
                id: `brand${item.id}`,
                sort: item.sort,
                image: item.image,
                href: ROUTES.CATALOG_BRAND(item.id).url,
            });
        });
        manufacturers.forEach(item => {
            result.push({
                id: `manufacturer${item.id}`,
                sort: item.sort,
                image: item.image,
                href: ROUTES.CATALOG_MANUFACTURER(item.id).url,
            });
        })
        return result.sort((a, b) => a.sort - b.sort);
    }, [brands, manufacturers]);

    return (
        <UiSlider
            className={'p-home-brands'}
            items={items}
            perPage={5}
            perGroup={1}
            loop
            renderItem={(item: ItemType) => {
                return (
                    <UiLink href={item.href} className="p-home-brands-slide">
                        <img src={item.image} alt=""/>
                    </UiLink>
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
