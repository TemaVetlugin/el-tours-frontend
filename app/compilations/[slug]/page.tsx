import { Metadata } from "next";
import React from "react";

import { Client } from "./client";

type PropsType = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    return {
        title: 'Подборки',
    }
}

export default async function Page({ params }: PropsType) {
    return (
        <Client slug={params.slug}/>
    )
}
