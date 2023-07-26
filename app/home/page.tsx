import React from "react";
import { Metadata } from "next";

import { Client } from "./client";
import { Cache, Cookie } from "shared/utilities/server";
import { homeQuery } from "shared/queries/frontend";

import './page.scss';

export default async function Page() {
    const cityId = Cookie.get('cityId');
    const { data, description } = await Cache.remember(
        `homeQuery:${cityId}`,
        async () => await homeQuery({
            cityId: cityId === null ? cityId : +cityId
        }),
    );

    return (
        <Client
            homeBanners={data?.homeBanners || []}
            promoActions={data?.promoActions || []}
            brands={data?.brands || []}
            manufacturers={data?.manufacturers || []}
            articles={data?.articles || []}
            news={data?.news || []}
            catalogProductsNew={data?.catalogProductsNew || []}
            catalogProductsProfit={data?.catalogProductsProfit || []}
            catalogProductsPopular={data?.catalogProductsPopular || []}
        />
    );
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Главная',
    };
}
