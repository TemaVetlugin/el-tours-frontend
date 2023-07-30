import React from "react";
import { Metadata } from "next";

import { catalogProductsGetQuery } from "shared/queries/main";
import { notFound } from "next/navigation";
import { getCity } from "shared/server";
import { Cache, Cookie } from "shared/utilities/server";

import { Client } from "./client";

type PropsType = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    const city = await getCity();
    const { isSuccess, data } = await Cache.remember(
        `catalogProductsGetQuery:${params.slug}`,
        async () => await catalogProductsGetQuery({
            slug: params.slug,
            cityId: city.id
        })
    );
    if (isSuccess && data) {
        return {
            title: data.item.name
        }
    }
    return {
        title: 'Каталог',
    }
}

export default async function Page({ params }: PropsType) {
    const city = await getCity();

    const { isSuccess, data } = await Cache.remember(
        `catalogProductsGetQuery:${params.slug}`,
        async () => await catalogProductsGetQuery({
            slug: params.slug,
            cityId: city.id
        })
    );

    if (!isSuccess || !data) {
        notFound();
    }

    return (
        <Client catalogProduct={data.item}/>
    )
}
