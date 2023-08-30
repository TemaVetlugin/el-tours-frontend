import React from "react";
import { Metadata } from "next";

import { Client } from "./client";
import { Cache } from "shared/utilities/server";

import './page.scss';
import {vacancyGetQuery} from "shared/queries/main";

type PropsType = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    const { isSuccess, data } = await Cache.remember(
        `vacancyGetQuery:${params.slug}`,
        async () => await vacancyGetQuery(params)
    );
    if (isSuccess && data) {
        return {
            title: data.item.name
        }
    }

    return {
        title: 'Вакансии',
    }
}

export default async function Page({params}: PropsType) {

    return (
        <Client slug={params.slug}/>
    );
}

