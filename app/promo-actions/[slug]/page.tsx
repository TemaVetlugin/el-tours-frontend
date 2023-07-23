import React from "react";
import { Metadata } from "next";

import { newsGetQuery, promoActionsGetQuery } from "shared/queries/main";
import { Cache } from "shared/utilities/server";

import { Client } from "./client";

import './page.scss';
import { notFound } from "next/navigation";

type PropsType = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    const { isSuccess, data } = await Cache.remember(
        `promoActionsGetQuery:${params.slug}`,
        async () => await promoActionsGetQuery(params)
    );

    if (isSuccess && data) {
        return {
            title: data.item.name
        }
    }

    return {
        title: 'Акция',
    }
}

export default async function Page({ params }: PropsType) {
    return (
        <Client slug={params.slug}/>
    )
}
