import React from "react";
import { Metadata } from "next";

import { Client } from "./client";
import { Cache } from "shared/utilities/server";
import { homeQuery } from "shared/queries/frontend";
import { getCity } from "shared/server";

import './page.scss';

export default async function Page() {
    const city = await getCity();

    const { data, description } = await Cache.remember(
        `homeQuery:${city.id}`,
        async () => await homeQuery({
            cityId: city.id
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
        title: 'Блог',
    };
}
