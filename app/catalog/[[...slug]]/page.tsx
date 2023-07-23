import React from "react";
import { Metadata } from "next";

import { CatalogCategoryModelInterface } from "shared/models";
import { catalogCategoriesQuery } from "shared/queries/main";
import { Cache } from "shared/utilities/server";

import { Client } from "./client";

import './page.scss';

type PropsType = {
    params: {
        slug?: string[]
    }
}

export default function Page({ params }: PropsType) {
    return <Client slug={params.slug}/>
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    const { data, isSuccess } = await Cache.remember(
        'catalogCategories',
        async () => await catalogCategoriesQuery()
    );
    let catalogCategory: CatalogCategoryModelInterface | undefined;

    if (isSuccess && data) {
        catalogCategory = data.items.find(catalogCategory => catalogCategory.slug === params?.slug?.at(0));
        if (catalogCategory) {
            return {
                title: catalogCategory.name
            }
        }
    }

    return {
        title: 'Каталог',
    };
}
