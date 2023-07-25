import { CatalogProductModel } from "shared/models";
import { ROUTES } from "shared/contants";
import { UrlType } from "shared/types";
import React from "react";
import { UiIcon } from "shared/ui";

type PropertyType = {
    id: string,
    label: string,
    value: (catalogProduct: CatalogProductModel) => string | number | null | React.ReactNode,
    href: (catalogProduct: CatalogProductModel) => UrlType,
    image: (catalogProduct: CatalogProductModel) => string | null,
}

export const PROPERTIES: PropertyType[] = [{
    id: 'dosage',
    label: 'Дозировка',
    value: (catalogProduct) => catalogProduct.dosage,
    href: () => null,
    image: () => null
},{
    id: 'packageAmount',
    label: 'Количество в упаковке',
    value: (catalogProduct) => catalogProduct.packageAmount,
    href: () => null,
    image: () => null
}, {
    id: 'size',
    label: 'Объём',
    value: (catalogProduct) => catalogProduct.size,
    href: () => null,
    image: () => null
},  {
    id: 'releaseForm',
    label: 'Форма выпуска',
    value: (catalogProduct) => catalogProduct.releaseForm,
    href: () => null,
    image: () => null
}, {
    id: 'substances',
    label: 'Действующее вещество',
    value: (catalogProduct) => catalogProduct.substances?.map(substance => substance.name).join(', '),
    href: (catalogProduct) => ROUTES.CATALOG_SUBSTANCE(catalogProduct.substances[0]?.id),
    image: () => null
},   {
    id: 'thermolabile',
    label: 'Термолабильность',
    value: (catalogProduct) => catalogProduct.thermolabile ? (
        <>
            <span>{catalogProduct.thermolabile}</span>
            <UiIcon size={16} name={'snow'}/>
        </>
    ) : null,
    href: () => null,
    image: () => null
},{
    id: 'country',
    label: 'Страна производства',
    value: (catalogProduct) => catalogProduct.country?.name || null,
    href: () => null,
    image: (catalogProduct) => null
}, {
    id: 'manufacturer',
    label: 'Производитель',
    value: (catalogProduct) => catalogProduct.manufacturer?.name || null,
    href: (catalogProduct) => ROUTES.CATALOG_MANUFACTURER(catalogProduct.manufacturer?.id),
    image: (catalogProduct) => catalogProduct.manufacturer?.image || null
}, {
    id: 'brand',
    label: 'Бренд',
    value: (catalogProduct) => catalogProduct.brand?.name || null,
    href: (catalogProduct) => ROUTES.CATALOG_BRAND(catalogProduct.brand?.id),
    image: (catalogProduct) => catalogProduct.brand?.image || null
}];
