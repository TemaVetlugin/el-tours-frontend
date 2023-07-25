import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { brandsGetQuery } from "shared/queries/main";
import { Cache } from "shared/utilities/server";

import { Client } from "./client";

import './page.scss';

type PropsType = {
    params: {
        id: number
    }
}

export default async function Page({ params }: PropsType) {
    const { isSuccess, data, description } = await Cache.remember(`brandsGetQuery:${params.id}`, async () => await brandsGetQuery(params));

    if (!isSuccess || !data) {
        notFound();
        return null;
    }

    return <Client brand={data.item}/>
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    const { isSuccess, data } = await Cache.remember(`brandsGetQuery:${params.id}`, async () => await brandsGetQuery(params));

    if (isSuccess && data) {
        return {
            title: `Бренд: ${data.item.name}`
        }
    }

    return {
        title: 'Каталог'
    }
}
