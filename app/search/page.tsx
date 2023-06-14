import React from "react";
import { Metadata } from "next";

import { Client } from "./client";

type PropsType = {
    searchParams: {
        query: string
    }
}

export async function generateMetadata({ searchParams }: PropsType): Promise<Metadata> {
    return {
        title: `Поиск: ${searchParams.query}`,
    };
}

export default function Page(props: PropsType) {
    return <Client query={props?.searchParams?.query}/>;
};
