import React from "react";
import { catalogProductsGetQuery } from "shared/queries/main";
import { notFound } from "next/navigation";
import { Client } from "./client";

type PropsType = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PropsType) {
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

export default async function ProductPage({ params }: PropsType) {
    const { isSuccess, data } = await catalogProductsGetQuery(params);
    if (!isSuccess || !data) {
        notFound();
    }
    return (
        <Client catalogProduct={data.item}/>
    )
}
