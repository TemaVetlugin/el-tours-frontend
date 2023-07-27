import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { LETTERS } from "shared/layout/LayoutCatalogAlphabet/letters";

import { Client } from "./client";

import './page.scss';

type PropsType = {
    params: {
        id: string
    }
}

export default async function Page({ params }: PropsType) {
    if (!LETTERS[params.id]) {
        notFound();
        return null;
    }

    return <Client letter={params.id}/>
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    if (LETTERS[params.id]) {
        return {
            title: `Товары по алфавиту: ${LETTERS[params.id].label}`
        }
    }

    return {
        title: 'Каталог'
    }
}
