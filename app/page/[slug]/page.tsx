import React from "react";
import { Metadata } from "next";

import { Client } from "./client";
import './page.scss';
import { contentPageGet } from "shared/queries/main";
import { notFound } from "next/navigation";
import { Cache } from "shared/utilities/server";


type PropsType = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    console.log(111)
    const { isSuccess, data } = await Cache.remember(
        `contentPageGet:${params.slug}`,
        async () => await contentPageGet({ slug: params.slug })
    );
    if (isSuccess && data) {
        return {
            title: data.item.seoTitle,
            description: data.item.seoDescription,
            keywords: data.item.seoKeywords,
        }
    }
    return {
        title: 'Текстовая страница',
    };
}

export default async function Page({ params }: PropsType) {
    console.log(1)
    const { isSuccess, data, description } = await Cache.remember(
        `contentPageGet:${params.slug}`,
        async () => await contentPageGet({ slug: params.slug })
    );
    console.log(data, description);
    if (isSuccess && data) {
        return <Client contentPage={data.item}/>
    }
    notFound();
    return null;
}


