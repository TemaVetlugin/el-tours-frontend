import React from "react";
import { Metadata } from "next";

import { Client } from "./client";
import { Cache } from "shared/utilities/server";

import './page.scss';
import {articlesGetQuery} from "shared/queries/main";

type PropsType = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    const { isSuccess, data } = await Cache.remember(
        `articlesGetQuery:${params.slug}`,
        async () => await articlesGetQuery(params)
    );
    if (isSuccess && data) {
        return {
            title: data.item.name
        }
    }

    return {
        title: 'Блог',
    }
}

export default async function Page({params}: PropsType) {

    return (
        <Client slug={params.slug}/>
    );
}

