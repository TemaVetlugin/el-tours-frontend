import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { substancesGetQuery } from "shared/queries/main";
import { Cache } from "shared/utilities/server";

import { Client } from "./client";

import './page.scss';

type PropsType = {
    params: {
        id: number
    }
}

export default async function Page({ params }: PropsType) {
    const { isSuccess, data, description } = await Cache.remember(`substancesGetQuery:${params.id}`, async () => await substancesGetQuery(params));

    if (!isSuccess || !data) {
        notFound();
        return null;
    }

    return <Client substance={data.item}/>
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    const { isSuccess, data } = await Cache.remember(`substancesGetQuery:${params.id}`, async () => await substancesGetQuery(params));

    if (isSuccess && data) {
        return {
            title: `Действующее вещество: ${data.item.name}`
        }
    }

    return {
        title: 'Каталог'
    }
}
