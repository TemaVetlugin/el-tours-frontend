import React from "react";
import { Metadata } from "next";

import { catalogProductsGetQuery } from "shared/queries/main";
import { notFound } from "next/navigation";
import { Cookie } from "shared/utilities/server";

import { Client } from "./client";

type PropsType = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    const { isSuccess, data } = await catalogProductsGetQuery(params);
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
    const cityId = Cookie.get('cityId');

    const { isSuccess, data, description } = await catalogProductsGetQuery({
        slug: params.slug,
        cityId
    });

    console.log(isSuccess, data, description)

    if (!isSuccess || !data) {
        notFound();
    }

    return (
        <Client catalogProduct={data.item}/>
    )
}
