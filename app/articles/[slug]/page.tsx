import React from "react";
import { Metadata } from "next";

import { newsGetQuery } from "shared/queries/main";
import { Cache } from "shared/utilities/server";

import { Client } from "./client";

import './page.scss';

type PropsType = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    const { isSuccess, data } = await Cache.remember(
        `newsGetQuery:${params.slug}`,
        async () => await newsGetQuery(params)
    );
    if (isSuccess && data) {
        return {
            title: data.item.name
        }
    }
    return {
        title: 'Новости',
    }
}

export default async function Page({ params }: PropsType) {
    return (
        <Client slug={params.slug}/>
    )
}
