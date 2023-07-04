import React from "react";
import { Metadata } from "next";

import { Client } from "./client";
import { Cache, Cookie } from "shared/utilities/server";
import { homeQuery } from "shared/queries/frontend";

import './page.scss';

export default async function Page() {
    const cityId = Cookie.get('cityId');
    const { data, description } = await Cache.remember(
        'boot',
        async () => await homeQuery({
            cityId: cityId === null ? cityId : +cityId
        }),
    );

    return (
        <Client
            homeBanners={data?.homeBanners || []}
        />
    );
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Главная',
    };
}
